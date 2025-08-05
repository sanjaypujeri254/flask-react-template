import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Add new task
  const addTask = async () => {
    if (!newTaskTitle.trim()) return;
    try {
      await axios.post('/api/tasks', { title: newTaskTitle });
      setNewTaskTitle('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Update task
  const updateTask = async (id) => {
    if (!editTaskTitle.trim()) return;
    try {
      await axios.put(`/api/tasks/${id}`, { title: editTaskTitle });
      setEditTaskId(null);
      setEditTaskTitle('');
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🗂️ Task Manager</h1>

      {/* Add Task */}
      <div className="flex mb-6 gap-2">
        <input
          type="text"
          placeholder="Enter new task title"
          className="border px-3 py-2 rounded w-full"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between border p-3 rounded"
          >
            {editTaskId === task.id ? (
              <div className="flex w-full gap-2">
                <input
                  type="text"
                  className="border px-2 py-1 rounded w-full"
                  value={editTaskTitle}
                  onChange={(e) => setEditTaskTitle(e.target.value)}
                />
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  onClick={() => updateTask(task.id)}
                >
                  Save
                </button>
                <button
                  className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                  onClick={() => setEditTaskId(null)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span>{task.title}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditTaskId(task.id);
                      setEditTaskTitle(task.title);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
