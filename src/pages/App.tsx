import { useState, useEffect } from "react";
import LoginPage from "./LoginPage";
import InvoiceForm from "../components/InvoiceForm";

// Main App Component
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const session = localStorage.getItem("userSession");
    if (session) {
      setUsername(session);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (user) => {
    localStorage.setItem("userSession", user);
    setUsername(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    setIsAuthenticated(false);
    setUsername("");
  };

  return (
    <div>
      {!isAuthenticated ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <InvoiceForm onLogout={handleLogout} username={username} />
      )}
    </div>
  );
};

export default App;