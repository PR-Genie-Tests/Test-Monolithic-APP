from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# Bug: Using deprecated declarative_base, should use DeclarativeBase from SQLAlchemy 2.0
