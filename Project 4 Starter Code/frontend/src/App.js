import React from 'react'
import "./App.css";
import Register from "./components/shared components/Register/Register"
import { useState,createContext } from 'react';
import Login from './components/shared components/Login/Login';
export const UserContext=createContext()
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"))
  return (
<UserContext.Provider value={{token,setToken}}>
   <div className="App">
    <Register />
    <Login/>
    </div>
    </UserContext.Provider>
     )
}

export default App
