import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
export default function Navbar() {
    return (
        <nav>
        <div className="nav-bar">
            <div className="nav-box">
                <NavLink to='/' className='link-text'  >Home</NavLink>
                <NavLink to='/about' className='link-text'  >About</NavLink>
                <NavLink to='/login'   className='link-text'>Login</NavLink>
                <NavLink to='/registration'   className='link-text'>Registration</NavLink>
                <NavLink to='/contact'   className='link-text'>Contact</NavLink>
            </div>
        </div>
    </nav>
    )
}
