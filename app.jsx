import React, { useState, useContext, createContext, useEffect } from "react";
import "./App.css";

// Create Context
const UserContext = createContext();

// UserProvider Component
const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

// Login Component
const Login = ({ onLogin }) => {
  const { setUsername } = useContext(UserContext);
  const [input, setInput] = useState("");

  const handleLogin = () => {
    if (input.trim() !== "") {
      setUsername(input);
      onLogin();
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  const { username } = useContext(UserContext);

  useEffect(() => {
    console.log("Dashboard Loaded");
  }, []);

  return (
    <div className="dashboard">
      <h2>Welcome, {username}!</h2>
    </div>
  );
};

// App Component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserProvider>
      <div className="app-container">
        {!isLoggedIn ? (
          <Login onLogin={() => setIsLoggedIn(true)} />
        ) : (
          <Dashboard />
        )}
      </div>
    </UserProvider>
  );
};

export default App;
