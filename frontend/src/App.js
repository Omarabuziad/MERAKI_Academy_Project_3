import {React,useState} from 'react';
import {BrowserRouter as Router , Route,Redirect}  from 'react-router-dom';
import './App.css';
import Register from "./components/Register"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import Navigator from "./components/Navigator"
import NewArticle from "./components/NewArticle"



export default function App() {
  const [token, setToken] = useState("")
  const [loginSucc, setloginSucc] = useState(false)



  return (
    <div className = "app">
      <Navigator loginSucc={loginSucc}/>
     <Route path="/register"  component={Register}/>
     <Route path="/Login" render={ () => <Login loginToken={setToken} setloginSucc={setloginSucc}  /> }/>
     <Route path="/dashboard"  component={Dashboard}/>
     <Route path="/newarticle" render={ () => <NewArticle token={token}/>}/>
     {token?<Redirect to="/dashboard" /> : null }
      
    </div>
  );
}
