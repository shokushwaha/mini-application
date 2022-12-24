import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'
import axios from 'axios'
export default function Navbar() {
    const navigate = useNavigate();
    const logOutButton = async () => {
        try {
            await axios.delete("/logout");
            alert('logged out');
            navigate("/login");

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <nav>
            <div className="nav-bar">
                <div className="nav-box">
                    <NavLink to='/' className='link-text'  >Home</NavLink>
                    <NavLink to='/about' className='link-text'  >About</NavLink>
                    <NavLink to='/login' className='link-text'>Login</NavLink>
                    <NavLink to='/registration' className='link-text'>Registration</NavLink>
                    <NavLink to='/contact' className='link-text'>Contact</NavLink>
                    <button onClick={logOutButton} >LogOut</button>
                </div>
            </div>
        </nav>
    )
}
