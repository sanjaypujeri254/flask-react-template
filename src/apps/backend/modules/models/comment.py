from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from modules.extensions import db  # Assuming extensions has db instance

class Comment(db.Model):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True)
    task_id = Column(Integer, nullable=False)
    content = Column(String(500), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
