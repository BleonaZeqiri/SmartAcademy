import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { logout } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <h1>Home page</h1>
              <button onClick={logout}>Login out</button>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
