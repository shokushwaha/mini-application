import React from 'react'
import { useState } from 'react'
import { NavLink} from 'react-router-dom'
import axios from 'axios'
export default function Registration() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: ""

  });
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  }

  const sendRegister = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;

    try {
      const res = await fetch('/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, email, phone, work, password, cpassword
        })
      });

      const data = res.json();
      if (data.status === 422 || !data)
        console.log("Failed");
      else {
        console.log("Successful");

      }
    }

    catch (err) {
      console.log(err);
    }
  }

  return (
    <div>

      <form method='POST'>


        <label htmlFor="name">Enter Name:
          <input type="text" name="name" placeholder='Name' value={user.name} onChange={handleChange} />
        </label>

        <label htmlFor="name">Enter Email:
          <input type="text" name="email" placeholder='Email' value={user.email} onChange={handleChange} />
        </label>

        <label htmlFor="name">Enter Phone:
          <input type="number" name="phone" placeholder='Phone' value={user.phone} onChange={handleChange} />
        </label>

        <label htmlFor="name">Enter Work:
          <input type="text" name="work" placeholder='Work' value={user.work} onChange={handleChange} />
        </label>

        <label htmlFor="name">Enter Password:
          <input type="password" name="password" placeholder='Password' value={user.password} onChange={handleChange} />
        </label>

        <label htmlFor="name">Confirm Password:
          <input type="password" name="cpassword" placeholder='Confirm Password' value={user.cpassword} onChange={handleChange} />
        </label>

        <input type="submit" name="register" value="Register" onClick={sendRegister} />
      </form>

      <span>Already Registered? <NavLink to="/login">Login Now</NavLink></span>

    </div>
  )
}
