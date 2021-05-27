import React from 'react'
import Header from "./Header"
import {BrowserRouter as Router , Route,Link}  from 'react-router-dom';

const Navigator = () => {
    return (
        <div className = "navigator">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
    </div>
    )
}

export default Navigator
