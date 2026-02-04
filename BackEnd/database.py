from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Use DATABASE_URL from environment (Railway provides this), fallback to SQLite for local dev
DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL:
    # Railway/Heroku use postgres:// but SQLAlchemy needs postgresql+psycopg://
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+psycopg://", 1)
    elif DATABASE_URL.startswith("postgresql://"):
        DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg://", 1)
    engine = create_engine(DATABASE_URL, pool_pre_ping=True)
else:
    # Local development fallback to SQLite
    db_dir = os.path.dirname(os.path.abspath(__file__))
    DATABASE_URL = f"sqlite:///{os.path.join(db_dir, 'syllabud.db')}"
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False}  # Needed for SQLite
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    """Dependency to get database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """Initialize database tables"""
    from models import User, UserPreferences, Course  # Import models to register them
    Base.metadata.create_all(bind=engine)
