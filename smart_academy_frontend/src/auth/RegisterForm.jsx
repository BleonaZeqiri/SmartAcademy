import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/auth/LoginForm.css";

import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/auth/smart_academy-logo.png";

export default function RegisterForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3008/auth/signup", {
        username,
        email,
        password,
      });

      if (response.status === 201 || response.data.success) {
        login(response.data.access_token);
        navigate("/");
      } else {
        setError("Registration failed. Try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="offset-md-2 col-lg-4 col-md-7 offset-lg-4 offset-md-3">
          <div className="panel bg-white p-3">
            <div className="panel-heading">
              <img src={logo} alt="Logo" className="logo" />
              <h3 className="font-weight-bold">Welcome to SmartAcademy</h3>
            </div>
            <div className="pt-3 font-weight-bold">
              {error && <p style={{ color: "red" }}>{error}</p>}

              <form onSubmit={handleRegister}>
                <div className="form-group py-2 m-1">
                  <div className="input-field position-relative">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="position-absolute"
                      style={{
                        left: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Enter your username"
                      className="form-control"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group py-2 m-1">
                  <div className="input-field position-relative">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="position-absolute"
                      style={{
                        left: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="form-control pl-5"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group py-1 pb-2">
                  <div className="input-field position-relative">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="position-absolute"
                      style={{
                        left: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="form-control pl-5"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="btn bg-white text-muted position-absolute"
                      style={{
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="p-2"
                      />
                    </button>
                  </div>
                </div>

                <div className="form-group py-1 pb-2">
                  <button className="login_submit btn  w-100 p-2 btn-block mt-3">
                    Register
                  </button>
                </div>

                <div className="form-inline text-end">
                  <a
                    href="/ForgotPassword"
                    id="forgot"
                    className="font-weight-bold text-end"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="text-center pt-4 text-muted">
                  Already have an account? <a href="/login">Login</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
