import React from 'react'
import { NavLink } from 'react-router-dom'
export default function Login() {
  return (
    <div>


      <form >


        <label htmlFor="email">Enter email:
          <input type="email" placeholder='Email' />
        </label>
        <label htmlFor="password">Enter password:
          <input type="password" placeholder='Password' /></label>




        <input type="submit" name="login" value="Login" />


      </form>
      <span>Not registered?  <NavLink to='/registration'>Register Here</NavLink></span>

    </div>
  )
}
