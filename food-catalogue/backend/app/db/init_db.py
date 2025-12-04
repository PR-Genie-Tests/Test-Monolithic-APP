from sqlalchemy.orm import Session

from app.db.base import Base  # noqa
from app.db.session import engine
from app.models.user import User # noqa
from app.models.category import Category # noqa
from app.models.food import Food # noqa

# make sure all SQL Alchemy models are imported (app.models) before initializing DB
# otherwise, SQL Alchemy might not see them

def init_db(db: Session) -> None:
    # Tables should be created with Alembic migrations
    # But for simplicity, we create them here
    Base.metadata.create_all(bind=engine)

    # Bug: No initial superuser creation
    # Bug: No initial categories or foods, making the app empty on first run
    # Bug: create_all is not suitable for production, should use migrations
