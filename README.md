### Task 1 – Backend API for Comment Management

✅ Implemented APIs for:
- POST /api/tasks/:task_id/comments → Add comment
- PUT /api/comments/:id → Edit comment
- DELETE /api/comments/:id → Delete comment

✅ Used:
- Flask Blueprints
- SQLAlchemy
- Pytest for unit testing

📌 Assumptions:
- Task model exists
- No auth/user-level filtering for now

Tested using Postman and automated tests.
### Task 2 – Bonus: React UI for Task Management

✅ Features:
- Add Task
- Edit Task
- Delete Task

✅ Tech Used:
- React.js with functional components
- Axios for API communication
- TailwindCSS for styling

📌 Assumptions:
- Using /api/tasks endpoints
- Task list fetched and rendered on page load
- No auth or pagination

Component: `frontend/components/TaskManager.jsx`
