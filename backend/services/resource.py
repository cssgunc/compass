from fastapi import Depends
from ..database import db_session
from sqlalchemy.orm import Session


class ResourceService:

    def __init__(self, session: Session = Depends(db_session)):
        self._session = session
