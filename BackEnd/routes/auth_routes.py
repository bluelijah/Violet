from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from database import get_db
from models import User, UserPreferences
from auth import hash_password, verify_password, create_access_token, get_current_user

router = APIRouter(prefix="/auth", tags=["authentication"])


# Pydantic schemas
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True


class UserWithPreferences(BaseModel):
    id: int
    username: str
    email: str
    preferences: dict | None = None

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class PreferencesUpdate(BaseModel):
    learning_style: str
    preferences_text: str


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    # Check if username exists
    if db.query(User).filter(User.username == user_data.username).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )

    # Check if email exists
    if db.query(User).filter(User.email == user_data.email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Create new user
    hashed_password = hash_password(user_data.password)
    new_user = User(
        username=user_data.username,
        email=user_data.email,
        password_hash=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Login and get access token"""
    # Find user by username
    user = db.query(User).filter(User.username == form_data.username).first()

    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create access token (sub must be a string per JWT spec)
    access_token = create_access_token(data={"sub": str(user.id)})

    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=UserWithPreferences)
def get_me(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Get current user info"""
    prefs = db.query(UserPreferences).filter(UserPreferences.user_id == current_user.id).first()

    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "preferences": {
            "learning_style": prefs.learning_style,
            "preferences_text": prefs.preferences_text
        } if prefs else None
    }


@router.put("/preferences")
def update_preferences(
    prefs_data: PreferencesUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update user's learning preferences"""
    prefs = db.query(UserPreferences).filter(UserPreferences.user_id == current_user.id).first()

    if prefs:
        prefs.learning_style = prefs_data.learning_style
        prefs.preferences_text = prefs_data.preferences_text
    else:
        prefs = UserPreferences(
            user_id=current_user.id,
            learning_style=prefs_data.learning_style,
            preferences_text=prefs_data.preferences_text
        )
        db.add(prefs)

    db.commit()
    return {"message": "Preferences updated successfully"}
