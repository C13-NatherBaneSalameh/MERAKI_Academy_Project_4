import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
// import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Test from "./Test.js";
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
  MDBBtn,
  MDBCardImage
} from "mdb-react-ui-kit";
import Dashboard from "./Dashboard/Dashboard.js";
import AddCourse from "./AddCourse/addCourse.js";

const Navbar = () => {
  const navigate = useNavigate();
  const login = () => {
    navigate("/login");
  };
  const register = () => {
    navigate("/register");
  };
  const back = () => {
    navigate(-1);
  };
  const forword = () => {
    navigate(1);
  };
  const logout = () => {
    navigate("/logout");
  };
  const addCourse = () => {
    navigate("/addNewCourse");
  };
  const dahboardCoutse = () => {
    navigate("/dashboard");
  };

  const { token, setLessAdd, lessAdd, role, setCentredModal, centredModal } =
    useContext(UserContext);
  const [openNav, setOpenNav] = useState(false);

  return (
    <MDBNavbar sticky expand="lg" className="navber">
      <MDBContainer fluid>
        <img style={{width:"100px",height:"75px"}} className="logo" src="https://res.cloudinary.com/duxfa6nqg/image/upload/v1736556922/wnvrbnsmkcvzziataj30.jpg"/>
        <MDBNavbarBrand href="#" style={{color:"rgb(14 62 86)",marginLeft:"10px" ,fontSize:"30px"}} >Easy Learning </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenNav(!openNav)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openNav} className="ooooo">
          <MDBNavbarNav>
            {token ? (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink
                    onClick={setLessAdd(false)}
                    active
                    aria-current="page"
                    href="/dashboard"
                    style={{ fontSize: "x-large",color:"rgb(14 62 86)" }}
                  >
                    Home
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  {role === "teacher" && (
                    <>
                      <MDBNavbarLink
                        href="#"
                        onClick={() => {
                          setCentredModal(true);
                          console.log("5555");
                          console.log(centredModal);
                        }}
                        active
                        aria-current="page"
                        style={{ fontSize: "x-large",color:"rgb(14 62 86)" }}
                      >
                        AddCorse
                      </MDBNavbarLink>
                    </>
                  )}
                  {/* {centredModal && <AddCourse />} */}
                </MDBNavbarItem>
                {role === "student" && (
                  <MDBNavbarLink
                    active
                    href="/favorite"
                    style={{ fontSize: "x-large",color:"rgb(14 62 86)" }}
                  >
                    {" "}
                    favorite{" "}
                  </MDBNavbarLink>
                )}

                <MDBNavbarItem>
                  <MDBNavbarLink href="/logout" style={{ fontSize: "x-large",color:"rgb(14 62 86)" }}>
                    Logout
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            ) : (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/" style={{ fontSize: "x-large",color:"rgb(14 62 86)" }}>
                    Login
                  </MDBNavbarLink>

                  {/* <button on onClick={login} className="b">
                  Login
                </button> */}
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink
                    href="/register"
                    style={{ fontSize: "x-large",color:"rgb(14 62 86)" }}
                  >
                    {" "}
                    Register
                  </MDBNavbarLink>
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
