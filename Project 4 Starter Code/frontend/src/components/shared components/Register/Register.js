import React from "react";
import axios from "axios";
import "./style.css";
import { useState } from "react";
const Register = () => {
  // const [userInfo, setUserInfo] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState(false)
  const [registerAs, setRegisterAs] = useState(false)
  const [roleId, setRoleId] = useState("")
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const createRegister = () => {
    axios
      .post(`http://localhost:5000/users/register`, {userName:userName,
        email:email,
        password:password,
        role:roleId})
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
      {registerAs? <><h2>Register</h2>
      <input
        type="text"
        placeholder="UserName"
        onChange={(e) => {
          // setUserInfo({ ...userInfo, userName: e.target.value });
          setUserName(e.target.value)

        }}
      />
      <input
        type="email"
        placeholder="Email..."
        onChange={(e) => {
          // setUserInfo({ ...userInfo, email: e.target.value });
          setEmail(e.target.value)


        }}
      />
      <input
        type="password"
        placeholder="Password..."
        onChange={(e) => {
          // setUserInfo({ ...userInfo, password: e.target.value });
          setPassword(e.target.value)

        }}
      />
      <button onClick={createRegister}>Register</button>
      
      {isRegister&&<p>{response.data.message}</p>}
      {error&&<p>{response.response.data.message}</p>}</>
    :<div>
      <button onClick={()=>{
        setRoleId("67758bfa06d797ae116babc6")
        setRegisterAs(true)
      }}>As a Teacher</button>
      <button onClick={()=>{
        setRoleId("6775877359d1e574b0f67dfd")
        setRegisterAs(true)

      }}>As a Student</button>





    </div>
    
    
    
    
    
    }
      
      
    </div>
  );
};
export default Register 