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
  const { token, setToken, role, setRole } = useContext(UserContext);
  const [loginInfo, setLoginInfo] = useState("");
  const [response, setResponse] = useState("");
  const [isLoged, setIsLoged] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const login = () => {
    axios
      .post(`http://localhost:5000/users/login`, loginInfo)
      .then((res) => {
        setResponse(res);
        console.log(res);
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
        console.log("err =>", error);
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
            The best offer <br />
            <span style={{ color: "hsl(218, 81%, 75%)" }}>
              for your business
            </span>
          </h1>

          <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora
            at cupiditate quis eum maiores libero veritatis? Dicta facilis sint
            aliquid ipsum atque?
          </p>
        </MDBCol>

        <MDBCol md="6" className="position-relative">
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

              <MDBInput
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
              {isError && <p>{error.response.data.message}</p>}

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
