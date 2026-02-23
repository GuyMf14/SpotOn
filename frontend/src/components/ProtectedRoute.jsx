import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../services/api";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null); // null = loading

  useEffect(() => {
    api.get("/user/me")
      .then(() => setAuth(true))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <div>טוען...</div>;
  return auth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;