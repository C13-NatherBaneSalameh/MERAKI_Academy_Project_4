import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
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

export default function App() {
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

  const { token, role } = useContext(UserContext);

  const [openNav, setOpenNav] = useState(false);

  return (<div>
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
        <MDBCollapse navbar open={openNav}>
          <MDBNavbarNav>
         
            {token ? (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink active aria-current="page" href="/dashboard">
                    Home
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  {role === "teacher" && (
                    <MDBNavbarLink href="/addNewCourse" active aria-current="page">AddCorse</MDBNavbarLink>
                  )}
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/logout">Logout</MDBNavbarLink>
                </MDBNavbarItem>
              </>
            ) : (
              <div className="logAndregBTN">
                <MDBNavbarItem></MDBNavbarItem>
                <button on onClick={login} className="b">
                  Login
                </button>

                <MDBNavbarItem>
                  <button onClick={register} className="b">
                    Register
                  </button>
                </MDBNavbarItem>
              </div>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    </div>);
}
