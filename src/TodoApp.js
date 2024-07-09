import React, { useState } from "react";
import "./TodoApp.style.css";

const TodoApp = ({ user, onLogout, tasks, onAddTask, onUpdateTaskStatus }) => {
  const [taskContent, setTaskContent] = useState("");
  const [taskPriority, setTaskPriority] = useState("low");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskAssignee, setTaskAssignee] = useState("Employee 1");

  const addTask = () => {
    if (taskContent.trim() === "") return;
    const newTask = {
      id: tasks.length + 1,
      content: taskContent,
      priority: taskPriority,
      deadline: taskDeadline,
      assignee: taskAssignee,
      addedDate: new Date(),
      status: "pending",
    };
    onAddTask(newTask);
    setTaskContent("");
    setTaskPriority("low");
    setTaskDeadline("");
    setTaskAssignee("Employee 1");
  };

  return (
    <div className="todo-container">
      <h1>TodoApp</h1>
      {user.role === "Manager" && (
        <div>
          <input
            type="text"
            className="input-section"
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
            placeholder="Enter Task Content..."
          />
          <select
            className="priority-section"
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="datetime-local"
            className="deadline-section"
            value={taskDeadline}
            onChange={(e) => setTaskDeadline(e.target.value)}
          />
          <select
            className="assignee-section"
            value={taskAssignee}
            onChange={(e) => setTaskAssignee(e.target.value)}
          >
            <option value="Employee 1">Employee 1</option>
            <option value="Employee 2">Employee 2</option>
          </select>
          <button className="add" onClick={addTask}>
            Add Task
          </button>
        </div>
      )}

      <ul className="todo-list">
        {tasks.map((task, index) => (
          <li key={index}>
            {task.content} | Priority: {task.priority} | Deadline:{" "}
            {new Date(task.deadline).toLocaleString()} | Assignee: {task.assignee} | Added Date:{" "}
            {new Date(task.addedDate).toLocaleString()} | Status: {task.status}
            {user.role === "Manager" && (
              <div>
                <button onClick={() => onUpdateTaskStatus(task.id, "archived")}>
                  Archive
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default TodoApp;
