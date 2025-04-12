import React, { useState } from "react";
import logo from "../assets/auth/smart_academy-logo.png";
import "../style/auth/LoginForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    console.log(event);

    try {
      const response = await axios.post("http://localhost:3008/auth/login", {
        email,
        password,
      });
      console.log(response);
      if (response.status === 200) {
        login(response.data.access_token);
        navigate("/");
      } else {
        setError("Login failed. Try again.");
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
              <h3 className="font-weight-bold">Reset password</h3>
            </div>
            <div className="pt-3 font-weight-bold">
              {error && <p style={{ color: "red" }}>{error}</p>}
              <form onSubmit={handleSubmit}>
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
                      className="form-control pl-5  "
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group py-1 pb-2">
                  <button className="login_submit btn  w-100 p-2 btn-block mt-3">
                    Send
                  </button>
                </div>

                <div className="text-center pt-4 text-muted">
                  <a href="/login">Back to login</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
