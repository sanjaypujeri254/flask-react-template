import pytest
from modules.models.comment import Comment
from modules.extensions import db

@pytest.fixture
def sample_task_id():
    return 1  # Assume this task exists in the test DB or mock one if needed

def test_create_comment(client, sample_task_id):
    response = client.post(f"/api/tasks/{sample_task_id}/comments", json={"content": "Test Comment"})
    assert response.status_code == 201
    data = response.get_json()
    assert data["message"] == "Comment created"
    assert "id" in data

def test_create_comment_missing_content(client, sample_task_id):
    response = client.post(f"/api/tasks/{sample_task_id}/comments", json={})
    assert response.status_code == 400
    assert "error" in response.get_json()

def test_update_comment(client, sample_task_id):
    # Create comment first
    create_resp = client.post(f"/api/tasks/{sample_task_id}/comments", json={"content": "Initial"})
    comment_id = create_resp.get_json()["id"]

    # Now update it
    update_resp = client.put(f"/api/comments/{comment_id}", json={"content": "Updated"})
    assert update_resp.status_code == 200
    assert update_resp.get_json()["message"] == "Comment updated"

def test_delete_comment(client, sample_task_id):
    # Create comment first
    create_resp = client.post(f"/api/tasks/{sample_task_id}/comments", json={"content": "To delete"})
    comment_id = create_resp.get_json()["id"]

    # Now delete it
    delete_resp = client.delete(f"/api/comments/{comment_id}")
    assert delete_resp.status_code == 200
    assert delete_resp.get_json()["message"] == "Comment deleted"

def test_update_nonexistent_comment(client):
    response = client.put("/api/comments/999999", json={"content": "Test"})
    assert response.status_code == 404

def test_delete_nonexistent_comment(client):
    response = client.delete("/api/comments/999999")
    assert response.status_code == 404
