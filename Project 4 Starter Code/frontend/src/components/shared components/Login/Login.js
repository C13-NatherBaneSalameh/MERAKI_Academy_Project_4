import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../../../App";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { token, setToken, role, setRole,userName,
    setUserName } = useContext(UserContext);
  const [loginInfo, setLoginInfo] = useState("");
  const [response, setResponse] = useState("");
  const [isLoged, setIsLoged] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const login = () => {
    axios
      .post(`http://localhost:5000/users/login`, loginInfo)
      .then((res) => {
        // !!!!!
        setUserName(res.data.userName)
        localStorage.setItem("userName",res.data.userName)
console.log("+++>",userName);

        setResponse(res);
        console.log(res.data.userName);
        setRole(res.data.role);
        localStorage.setItem("role", res.data.role);
        console.log("res =>", response);
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setIsLoged(true);
        setIsError(false);
      })
      .catch((err) => {
        // setResponse(err)
        setError(err);
        console.log("err =>", err);
        setIsError(true);
        setIsLoged(false);
      });
  };
  return (
    <MDBContainer
      fluid
      className="p-4 background-radial-gradient overflow-hidden"
    >
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <h1
            className="my-5 display-3 fw-bold ls-tight px-3"
            style={{ color: "hsl(218, 81%, 95%)" }}
          >
            Discover the Joy of <br />
            <span style={{ color:" rgb(14 62 86) "}}>
              Easy Learning!
            </span>
          </h1>

         
        </MDBCol>

        <MDBCol md="6" className="position-relative" style={{height:"628px"}}
        >
          <div
            id="radius-shape-1"
            className="position-absolute rounded-circle shadow-5-strong"
          ></div>
          <div
            id="radius-shape-2"
            className="position-absolute shadow-5-strong"
          ></div>

          <MDBCard className="my-5 bg-glass card">
            <MDBCardBody className="p-5">
              <h2 className="login">Login</h2>

              <MDBInput style={{width:"100%"}}
                wrapperClass="mb-4"
                label="Email"
                id="form3"
                type="email"
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, email: e.target.value });
                }}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form4"
                type="password"
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, password: e.target.value });
                }}
              />

              <MDBBtn className="w-100 mb-4" size="md" onClick={login}>
                sign in
              </MDBBtn>
              {isLoged && <p>{navigate("/dashboard")}</p>}
              {isError && <p>{error.response.data?.message}</p>}

              <div className="text-center">
                <p>or sign up with:</p>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="facebook-f" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="twitter" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="google" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="github" size="sm" />
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
