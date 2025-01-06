import React, { useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
const Logout = () => {
const navigate =useNavigate()
  const {  token, setToken ,setRole } = useContext(UserContext);
  setToken(null)
  setRole(null)

 
 localStorage.clear();
navigate("/")

};

export default Logout;