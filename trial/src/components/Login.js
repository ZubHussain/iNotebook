import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://i-notebook-backend-one.vercel.app/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      // window.location.href = '/inotes';
      navigate("/inotes");
    } else {
      alert("Invalid username or password");
    }
  };

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    
    <div className="main">
      <p className="sign" align="center">
        Login
      </p>
      <form className="form1" onSubmit={handleSubmit}>
        <input
          className="un "
          type="email"
          align="center"
          placeholder="Email"
          id="email"
          name="email"
          value={credentials.email}
          onChange={onchange}
        />
        <input
          className="pass"
          type="password"
          align="center"
          placeholder="Password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={onchange}
        />
         <button type="submit" className="btn btn-dark  submit">
         Submit
       </button>
        <p className="forgot" align="center"><Link href="#"/>Forgot Password?</p>
            
      </form>
    </div>
  );
}
