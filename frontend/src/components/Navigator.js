import React from 'react'
import {BrowserRouter as Router , Route,Link}  from 'react-router-dom';

const Navigator = ({loginSucc}) => {
    return (
        <div className = "navigator">
        {loginSucc?null:
        <Link to="/login">Login</Link>}
        {loginSucc?null:<Link to="/register">Register</Link>}
        {loginSucc?<Link to="/dashboard">Dashboard</Link>:null}
        {loginSucc?<Link to="/newarticle">New Artical</Link>:null}
    </div>
    )
}

export default Navigator
