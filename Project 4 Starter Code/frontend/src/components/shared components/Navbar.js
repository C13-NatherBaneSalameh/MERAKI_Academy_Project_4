import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
// import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse,
    MDBIcon,
    
  } from "mdb-react-ui-kit";

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
    const dahboardCoutse=()=>{
        navigate("/dashboard")
    }

  const { token,role } = useContext(UserContext);
  const [openNav, setOpenNav] = useState(false);

  return (
    <MDBNavbar expand="lg" className="navber">
      <MDBContainer fluid>
        <MDBNavbarBrand href="#" >Navbar</MDBNavbarBrand>
        <MDBCollapse navbar open={openNav}  className="ooooo">
          <MDBNavbarNav >
            {token ? (
              < >
                <MDBNavbarItem>
                  <MDBNavbarLink active aria-current="page" href="/dashboard" style={{fontSize:"x-large"}}>
                    Home
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  {role === "teacher" && (
                    <MDBNavbarLink href="/addNewCourse" active aria-current="page" style={{fontSize:"x-large"}}>AddCorse</MDBNavbarLink>
                  )}
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/logout" style={{fontSize:"x-large"}}>Logout</MDBNavbarLink>
                </MDBNavbarItem>
              </>
            ) : (
              <>
                <MDBNavbarItem>
                <MDBNavbarLink href="/login" style={{fontSize:"x-large"}}>Login</MDBNavbarLink>

                {/* <button on onClick={login} className="b">
                  Login
                </button> */}
                </MDBNavbarItem>
                <MDBNavbarItem>
                <MDBNavbarLink href="/register"  style={{fontSize:"x-large"}}> Register</MDBNavbarLink>

                  
                </MDBNavbarItem>
              </>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
);
};

export default Navbar;
