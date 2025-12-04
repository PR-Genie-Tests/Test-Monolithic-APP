from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.db.base import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    description = Column(String, nullable=True)

    foods = relationship("Food", back_populates="category")

# Bug: No length constraint on name or description, could lead to database errors
