import React from 'react';
import {BrowserRouter as Router , Route}  from 'react-router-dom';
import './App.css';
import Header from "./components/Header"
import Register from "./components/Register"
import Login from "./components/Login"
import Navigator from "./components/Navigator"


export default function App() {
  return (
    <div className = "app">
      <Navigator/>
     <Route path="/register"  component={Register}/>
     <Route path="/login"  component={Login}/>
      
      
    </div>
  );
}
