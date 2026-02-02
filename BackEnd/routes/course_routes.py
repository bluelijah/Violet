from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from google import genai
from dotenv import load_dotenv
import re
import os

# Load environment variables from .env file
load_dotenv()

from database import get_db
from models import User, UserPreferences, Course
from auth import get_current_user

router = APIRouter(prefix="/courses", tags=["courses"])

# Gemini client - loaded from .env file
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


# Pydantic schemas
class CourseCreate(BaseModel):
    query: str
    depth: int = 5  # 1-10 scale


class CourseResponse(BaseModel):
    id: int
    title: str
    query: str
    depth: int
    content: str
    created_at: str

    class Config:
        from_attributes = True


class CourseListItem(BaseModel):
    id: int
    title: str
    created_at: str

    class Config:
        from_attributes = True


def generate_course_content(query: str, depth: int, learning_style: str, preferences_text: str) -> tuple[str, str]:
    """Generate course content using Gemini API"""
    client = genai.Client(api_key=GEMINI_API_KEY)

    # Read structure template
    current_directory = os.path.dirname(os.path.abspath(__file__))
    structure_path = os.path.join(current_directory, "..", "..", "TextFiles", "structure.txt")

    with open(structure_path, "r") as file:
        structure_template = file.read().strip()

    # Build user preferences string
    user_input = f"Learning Style: {learning_style}, User Preferences: {preferences_text}"

    # Build prompt
    combined_input = (
        f"In the following prompt, you are an expert course designer and educator creating a comprehensive course on: {query} "
        f"at depth level {depth}/10 (where 1 is beginner overview and 10 is expert/research level) "
        f"using the following format: {structure_template}\n"
        "1. **Course Title**: A clear and concise course title, no more than 3 words, descriptive about the subject of study\n"
        "2. **Prerequisites**: The second section of this course should outline all the pre-existing knowledge one needs prior to learning the material\n"
        "3. **Course Content**: The third section should be a complete layout of the material that will be covered, adjusted for the depth level specified\n"
        "4. **Resources**: The fourth section should provide resources for each part of the covered material, with links. "
        "Based on the user's learning style and preferences, suggest media they would benefit from most.\n"
        f"User Preferences( {user_input} )\n"
    )

    # Generate content
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=combined_input
    )

    content = response.text

    # Extract course title
    match = re.search(r'## Course Title:\s*(.*)', content)
    if match:
        title = match.group(1).strip()
    else:
        # Try alternative patterns
        match = re.search(r'\*\*Course Title\*\*:\s*(.*)', content)
        if match:
            title = match.group(1).strip()
        else:
            title = query[:50]  # Fallback to truncated query

    # Sanitize title
    title = re.sub(r'[\\/*?:"<>|]', "", title)

    return title, content


@router.post("", response_model=CourseResponse, status_code=status.HTTP_201_CREATED)
def create_course(
    course_data: CourseCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new course by generating content with Gemini"""
    # Get user preferences
    prefs = db.query(UserPreferences).filter(UserPreferences.user_id == current_user.id).first()

    learning_style = prefs.learning_style if prefs else "visual"
    preferences_text = prefs.preferences_text if prefs else ""

    try:
        # Generate course content
        title, content = generate_course_content(
            query=course_data.query,
            depth=course_data.depth,
            learning_style=learning_style,
            preferences_text=preferences_text
        )

        # Save to database
        new_course = Course(
            user_id=current_user.id,
            title=title,
            query=course_data.query,
            depth=course_data.depth,
            content=content
        )
        db.add(new_course)
        db.commit()
        db.refresh(new_course)

        return {
            "id": new_course.id,
            "title": new_course.title,
            "query": new_course.query,
            "depth": new_course.depth,
            "content": new_course.content,
            "created_at": new_course.created_at.isoformat()
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate course: {str(e)}"
        )


@router.get("", response_model=List[CourseListItem])
def list_courses(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """List all courses for the current user"""
    courses = db.query(Course).filter(Course.user_id == current_user.id).order_by(Course.created_at.desc()).all()

    return [
        {
            "id": course.id,
            "title": course.title,
            "created_at": course.created_at.isoformat()
        }
        for course in courses
    ]


@router.get("/{course_id}", response_model=CourseResponse)
def get_course(
    course_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific course by ID"""
    course = db.query(Course).filter(
        Course.id == course_id,
        Course.user_id == current_user.id
    ).first()

    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )

    return {
        "id": course.id,
        "title": course.title,
        "query": course.query,
        "depth": course.depth,
        "content": course.content,
        "created_at": course.created_at.isoformat()
    }


@router.delete("/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_course(
    course_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a course"""
    course = db.query(Course).filter(
        Course.id == course_id,
        Course.user_id == current_user.id
    ).first()

    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )

    db.delete(course)
    db.commit()
