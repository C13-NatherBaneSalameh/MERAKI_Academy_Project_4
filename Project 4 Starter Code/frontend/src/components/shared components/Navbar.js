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
    <MDBNavbar expand="lg" className="navber">
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">Navbar</MDBNavbarBrand>
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
                    style={{ fontSize: "x-large" }}
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
                        style={{ fontSize: "x-large" }}
                      >
                        AddCorse
                      </MDBNavbarLink>
                    </>
                  )}
                  {centredModal && <AddCourse />}
                </MDBNavbarItem>
                <MDBNavbarItem>
                  {lessAdd && (
                    <MDBNavbarLink href="#">Add Lessone</MDBNavbarLink>
                  )}
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/logout" style={{ fontSize: "x-large" }}>
                    Logout
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            ) : (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/" style={{ fontSize: "x-large" }}>
                    Login
                  </MDBNavbarLink>

                  {/* <button on onClick={login} className="b">
                  Login
                </button> */}
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink
                    href="/register"
                    style={{ fontSize: "x-large" }}
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
