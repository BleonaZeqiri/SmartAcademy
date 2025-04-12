import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function RegisterForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    console.log("ff");
    try {
      const response = await axios.post("http://localhost:3008/auth/signup", {
        username,
        email,
        password,
      });

      if (response.status === 201 || response.data.success) {
        login(response.data.access_token);
        navigate("/"); // redirect to login after successful register
      } else {
        setError("Registration failed. Try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };
  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}

      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Register</button>
    </form>
  );
}
