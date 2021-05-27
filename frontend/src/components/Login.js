import React from 'react'
import RegInput from "./RegInput"
import LogRegButton from "./LogRegButton"


const Login = () => {
    return (
        <div className = "login">
            <h4 id="regss" >Login :</h4>
            <RegInput type="text" placeholder="email here"/>
            <RegInput type="Password" placeholder="password here"/> 
            <LogRegButton text="Login" />
        </div>
    )
}

export default Login
