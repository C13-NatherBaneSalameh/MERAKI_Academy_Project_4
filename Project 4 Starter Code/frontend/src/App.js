import React from 'react'
import "./App.css";
import Register from "./components/shared components/Register/Register"
import { useState,createContext } from 'react';
import { Route,Routes } from 'react-router-dom';
import Login from './components/shared components/Login/Login';
import Navbar from './components/shared components/Navbar';
import Dashboard from './components/shared components/Dashboard/dahboard';
import Logout from './components/Logout/logout';
export const UserContext=createContext()
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"))
  return (
<UserContext.Provider value={{token,setToken}}>
   <div className="App">
    <Navbar/>
    <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register />}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/logout' element={<Logout/>}/>





    </Routes>
    
    
    </div>
    </UserContext.Provider>
     )
}

export default App
