import React, { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, swtPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center bg-primary ">
        <div className="p-3 bg-white w-75">
          <h1>Login </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <button className="btn btn-success">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
