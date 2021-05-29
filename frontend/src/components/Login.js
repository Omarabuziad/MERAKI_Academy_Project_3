import {React,useState} from 'react'
import RegInput from "./RegInput"
import LogRegButton from "./LogRegButton"
const axios = require("axios");




const Login = ({loginToken,setloginSucc}) => {

    const inputLog ={}
    const inputHandler = (e)=>{
        let value =(e.target.value)
        let name = (e.target.name)
        inputLog[name]=value  
    }

    const [emailFail, setEmailFail] = useState(false)
    const [passwordFail, setPasswordFail] = useState(false)
    

    const loginPost = () => {
        // TODO: Your code here
        axios({
            method: 'post',
            url: 'http://localhost:5000/login',
            data: inputLog , 
        }).then((response) => {
            loginToken(response.data.token)
            setloginSucc(true)
            
        }).catch( (err)=>{
            if(err.response.status==404){
                setEmailFail(true)
            }else{
                setPasswordFail(true)
            }
        })
    }




    return (
        <div className = "login">
            <h4 className="regss" >Login :</h4>
            <RegInput onChange={inputHandler} name="email"  type="text" placeholder="email here"/>
            <RegInput onChange={inputHandler} name="password"  type="Password" placeholder="password here"/> 
            <LogRegButton text="Login" onClick={loginPost}/>
            {emailFail ? <div className="userfail"><h4 className="h4reg">The email doesn't exist</h4></div> : null}
            {passwordFail ? <div className="userfail"><h4 className="h4reg">The password you've entered is incorrect</h4></div> : null}
        </div>
    )
}

export default Login
