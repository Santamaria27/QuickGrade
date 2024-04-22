// Login.jsx
import React from 'react';
import './Login.css'; // Import Login styles if needed
import email_icon from '../../assets/email.png'
import password_icon from '../../assets/password.png'
import { useState } from "react";

//firebase imports
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig1"
import { Navigate } from "react-router-dom";

const Login = () => {
  const [error, setError]=useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");

  const handleLogin=(e)=>{
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    <Navigate to="/" replace />
  })
  .catch((error) => {
    setError(error.message);
  });
  }

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Login</div>
        <div className='underline'></div>
      </div>

      <div className="inputs">
        <div className='input'>
        <img src={email_icon} alt="" />
          <input type="email" placeholder='Email Id' onChange={e=>setEmail(e.target.value)}/>
        </div>

        <div className='input'>
        <img src={password_icon} alt="" />
          <input type="password" placeholder='Password' onChange={e=>setPassword(e.target.value)}/>
        </div>
      </div>

      <div className='submit-container'>
        <button type='submit' className='submit'onClick={handleLogin} >Login</button>
        {error && <span>{error}</span>}
      </div>
    </div>
  );
}

export default Login;
