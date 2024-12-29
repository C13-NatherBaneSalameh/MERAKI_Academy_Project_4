import React from "react";
import axios from "axios";
import "./style.css";
import { useState } from "react";
const Register = () => {
  const [userInfo, setUserInfo] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState(false)

  const createRegister = () => {
    axios
      .post(`http://localhost:5000/users/register`, userInfo)
      .then((res) => {
        setResponse(res);
        setIsRegister(true);
        console.log( "pass",response);

      })
      .catch((err) => {
        setResponse(err);
        setIsRegister(false);
        console.log( "err",response);
        setError(true)
        
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="UserName"
        onChange={(e) => {
          setUserInfo({ ...userInfo, userName: e.target.value });
        }}
      />
      <input
        type="email"
        placeholder="Email..."
        onChange={(e) => {
          setUserInfo({ ...userInfo, email: e.target.value });
        }}
      />
      <input
        type="password"
        placeholder="Password..."
        onChange={(e) => {
          setUserInfo({ ...userInfo, password: e.target.value });
        }}
      />
      <button onClick={createRegister}>Register</button>
      
      {isRegister&&<p>{response.data.message}</p>}
      {error&&<p>{response.response.data.message}</p>}
      
    </div>
  );
};
export default Register 