// frontend/src/components/Register.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { auth, registerWithEmailAndPassword, signInWithGoogle } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (name === "") {
      alert("Enter your name");
      return;
    }
    await registerWithEmailAndPassword(name, email, password);
    navigate("/survey");
  };

  // const handleGoogleRegister = async () => {
  //   await signInWithGoogle();
  //   navigate("/survey");
  // };

  const handleGoogleRegister = async () => {
    await signInWithGoogle();
    const token = localStorage.getItem('token'); // 获取存储的token
  
    try {
      const response = await axios.get('http://localhost:5001/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}` // 确保正确传递token
        }
      });
      const userData = response.data;
  
      if (userData && userData.surveyCompleted) {
        navigate("/dashboard");  // 如果survey已完成，导航到dashboard
      } else {
        navigate("/survey");  // 如果survey未完成，导航到survey
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);

  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="email"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          className="register__textBox"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <button
          className="register__btn"
          onClick={handleRegister}
        >
          Register
        </button>
        <button
          className="register__btn register__google"
          onClick={handleGoogleRegister}
        >
          <div>
            Register with Google
            <img
              src="https://www.transparentpng.com/thumb/google-logo/google-logo-png-icon-free-download-SUF63j.png"
              alt="Google logo"
            />
          </div>
        </button>
        <div style={{ marginTop: "20px" }}>
          Already have an account? <Link to="/login">Login</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Register;

