import React , {useState} from 'react'
import RegInput from "./RegInput"
import LogRegButton from "./LogRegButton"
const axios = require("axios");



// to handle Post value to server 


const inputReg1 ={first:"Omar"}

function Register() {
   //input information
    const inputReg ={}
    const inputHandler = (event)=>{
        let value =(event.target.value)
        let name = (event.target.name)
        inputReg[name]=value  
    }








    const [userSucc, setUserSucc] = useState(false)
    const [userFail, setUserFail] = useState(false)


    const createPost = () => {
        // TODO: Your code here
        console.log("Hi")
        axios({
            method: 'post',
            url: 'http://localhost:5000/users/',
            data: inputReg
        }).then((response) => {
            if(response.statusText == "Created"){
            setUserSucc(true);}else{
                setUserFail(true)

            }
            
        }).catch( (err)=>{
            throw err
        })
        
        /*axios.post("http://localhost:5000/users/" , post1 )
        .then((response) => {
            setUserSucc(true);
            console.log(response)
        })
        // in `.catch()` we add the code to handel the error
       .catch((err) => {
          alert("Error happened while register, please try again")
          throw err
        }); */
    };

    
    






    return (
        <div className = "register">
        <h4 className="regss" >Register :</h4>
        <RegInput name="firstName" type="text" placeholder="firstName here" onChange={inputHandler}/>
        <RegInput name="lastName" type="text"  placeholder="lastName here" onChange={inputHandler} /> 
        <RegInput name="age" type="number" placeholder="age here"  onChange={inputHandler}/> 
        <RegInput name="country" type="text" placeholder="country here" onChange={inputHandler}/> 
        <RegInput name="email" type="text" placeholder="email here" onChange={inputHandler}/> 
        <RegInput name="password" type="Password" placeholder="password here" onChange={inputHandler}/> 
        <LogRegButton onClick={createPost} text="Register" />
        {userSucc ? <div id="usercreated"><h4 id="h3reg">The user has been created successfully</h4></div> : ""}
        {userFail ? <div id="userfail"><h4 id="h4reg">Error happened while register, please try again</h4>
        </div> : ""}

        </div>
    )
}

export default Register
export {inputReg1}

