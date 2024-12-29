import React, { useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
const Logout = () => {
const navigate =useNavigate()
  const {  token, setToken } = useContext(UserContext);
  setToken(null)
 
 localStorage.clear();
navigate("/login")

};

export default Logout;