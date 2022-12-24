import React from 'react'
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { redirect } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch('/signin', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    const data = res.json();
    if (res.status === 400 || !data) { alert("Login failed"); }
    else {
      alert("Logged in");
      navigate("/");
    }

  }

  return (
    <div>


      <form method="POST">


        <label htmlFor="email">Enter email:
          <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label htmlFor="password">Enter password:
          <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} /></label>




        <input type="submit" name="login" value="Login" onClick={loginUser} />


      </form>
      <span>Not registered?  <NavLink to='/registration'>Register Here</NavLink></span>

    </div>
  )
}
