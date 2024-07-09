import React from "react";
import "./Employeetasks.style.css"; 

const Employee1Tasks = ({ tasks, updateTaskStatus, onLogout }) => {
  return (
    <div className="tasks-container">
      <h1>Employee 1 Tasks</h1>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            {task.content} | Priority: {task.priority} | Deadline: {new Date(task.deadline).toLocaleString()} | Added Date: {new Date(task.addedDate).toLocaleString()} | Status: {task.status}
            {task.status !== "completed" && (
              <button onClick={() => updateTaskStatus(task.id, "completed")}>Complete</button>
            )}
          </li>
        ))}
      </ul>
      <button className="logout-button" onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Employee1Tasks;
