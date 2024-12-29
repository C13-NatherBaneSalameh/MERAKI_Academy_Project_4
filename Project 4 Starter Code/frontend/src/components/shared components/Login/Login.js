import React from "react";
import axios from "axios";
import { useState,useContext } from "react";
import { UserContext } from "../../../App";
import { useNavigate } from "react-router-dom";

const Login = () => { 
    const navigate =useNavigate()
    const {token,setToken}=useContext(UserContext)
    const [loginInfo, setLoginInfo] = useState("")
    const [response, setResponse] = useState("")
    const [isLoged, setIsLoged] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState("")
    const login=()=>{
        axios.post(`http://localhost:5000/users/login`,loginInfo)
        .then((res)=>{
            setResponse(res)
            console.log("res =>",response);
            setToken(res.data.token)
            localStorage.setItem("token", res.data.token);
            setIsLoged(true)
            setIsError(false)
        })
        .catch((err)=>{
            // setResponse(err)
            setError(err)
            console.log("err =>",error);
            setIsError(true)
            setIsLoged(false)



        })
    }
  return (
    <div>
        <h2>Login</h2>
        <input type="email" placeholder="Email..." onChange={(e)=>{
            setLoginInfo({...loginInfo, email:e.target.value} )
        }}/>
        <input type="password" placeholder="Password..."onChange={(e)=>{
                        setLoginInfo({...loginInfo, password:e.target.value} )

        }}/>
        <button onClick={login}>Login </button>
        {isLoged&&<p>{navigate("/dashboard")}</p>}
        {isError&&<p>{error.response.data.message}</p>}

    </div>
  )
}

export default Login