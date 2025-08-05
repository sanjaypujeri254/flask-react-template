from flask import Blueprint, request, jsonify
from modules.models.comment import Comment
from modules.extensions import db

comment_bp = Blueprint("comment", __name__, url_prefix="/api")

@comment_bp.route("/tasks/<int:task_id>/comments", methods=["POST"])
def create_comment(task_id):
    data = request.get_json()
    content = data.get("content")
    if not content:
        return jsonify({"error": "Content required"}), 400

    comment = Comment(task_id=task_id, content=content)
    db.session.add(comment)
    db.session.commit()
    return jsonify({"message": "Comment created", "id": comment.id}), 201

@comment_bp.route("/comments/<int:comment_id>", methods=["PUT"])
def update_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    data = request.get_json()
    comment.content = data.get("content", comment.content)
    db.session.commit()
    return jsonify({"message": "Comment updated"})

@comment_bp.route("/comments/<int:comment_id>", methods=["DELETE"])
def delete_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    db.session.delete(comment)
    db.session.commit()
    return jsonify({"message": "Comment deleted"})
