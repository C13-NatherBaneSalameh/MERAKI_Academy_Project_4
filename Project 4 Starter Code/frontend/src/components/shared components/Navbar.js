import React, { useContext } from "react";
import { UserContext } from "../../App";
// import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate=useNavigate()
    const login=()=>{
        navigate("/login")
    }
    const register=()=>{
        navigate("/register")
    }
    const back=()=>{
        navigate(-1)
    }
    const forword=()=>{
        navigate(1)
    }
    const logout=()=>{
        navigate("/logout")
    }
    const addCourse=()=>{
        navigate("/addNewCourse")
    }

  const { token } = useContext(UserContext);
  return <div>{token ?
     <div>
        <button onClick={logout}>logout</button>
        <button onClick={addCourse}> AddCourse</button>
     </div>
      : 
      
      <div>
        <button on onClick={login}>Login</button>
        <button onClick={register}>Register</button>
        <button onClick={back} > Back</button>
        <button onClick={forword}>Forword</button>
        </div>}
      
      </div>;
};

export default Navbar;
