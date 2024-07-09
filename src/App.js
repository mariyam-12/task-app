import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TodoApp from "./TodoApp";
import Signup from "./Signup";
import Login from "./Login";
import Employee1Tasks from "./Employee1Tasks";
import Employee2Tasks from "./Employee2Tasks";

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (users.length === 0) {
      setCurrentUser(null);
    }
  }, [users]);

  const handleSignUp = (newUser) => {
    setUsers([...users, { ...newUser, tasks: [] }]);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTaskStatus = (taskId, status) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status };
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  };
  

  
  const redirectToLoginOrSignup = () => {
    if (currentUser) {
      return <Navigate to="/todo" />;
    } else if (users.length > 0) {
      return <Navigate to="/login" />;
    } else {
      return <Navigate to="/signup" />;
    }
  };

  
  let element;
  if (currentUser) {
    element = <Navigate to={`/${currentUser.role.toLowerCase().replace(/\s/g, '')}`} />;
  } else if (users.length > 0) {
    element = <Navigate to="/login" />;
  } else {
    element = <Navigate to="/signup" />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={redirectToLoginOrSignup()} />
        <Route path="/signup" element={<Signup onSignUp={handleSignUp} />} />
        <Route path="/login" element={<Login users={users} onLogin={handleLogin} />} />
        <Route path="/todo" element={element} />
        <Route
  path="/manager"
  element={
    (() => {
      if (currentUser && currentUser.role === "Manager") {
        return (
          <TodoApp
            user={currentUser}
            onLogout={handleLogout}
            tasks={tasks}
            onAddTask={handleAddTask}
            onUpdateTaskStatus={handleUpdateTaskStatus}
          />
        );
      } else {
        return <Navigate to="/login" />;
      }
    })()
  }
/>

       <Route
  path="/employee1"
  element={
    (() => {
      if (currentUser && (currentUser.role === "Employee 1" || currentUser.role === "Manager")) {
        return (
          <Employee1Tasks
            tasks={tasks.filter((task) => task.assignee === "Employee 1")}
            updateTaskStatus={handleUpdateTaskStatus}
            onLogout={handleLogout}
          />
        );
      } else {
        return <Navigate to="/login" />;
      }
    })()
  }
/>

<Route
  path="/employee2"
  element={
    (() => {
      if (currentUser && (currentUser.role === "Employee 2" || currentUser.role === "Manager")) {
        return (
          <Employee2Tasks
            tasks={tasks.filter((task) => task.assignee === "Employee 2")}
            updateTaskStatus={handleUpdateTaskStatus}
            onLogout={handleLogout}
          />
        );
      } else {
        return <Navigate to="/login" />;
      }
    })()
  }
/>

      </Routes>
    </Router>
  );
};

export default App;
