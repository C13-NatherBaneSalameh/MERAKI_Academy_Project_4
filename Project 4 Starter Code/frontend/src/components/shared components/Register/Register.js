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

  return(
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
            <span style={{ color: "hsl(555, 85%, 75%)" }}>
              for your business
            </span>
          </h1>

         
        </MDBCol>

        <MDBCol md="6" className="position-relative"style={{height:"480px" }}>
          <div
            id="radius-shape-1"
            className="position-absolute rounded-circle shadow-5-strong"
          ></div>
          <div
            id="radius-shape-2"
            className="position-absolute shadow-5-strong"
          ></div>

          <MDBCard className="my-5 bg-glass card1">
            <MDBCardBody className="p-5">
              <h3>Register as </h3>
              <div className="RegisterBtns">
                
                <MDBBtn
                  className="w-100 mb-4 "
                  size="md"
                  onClick={(e) => {
                    setRoleId("67758bfa06d797ae116babc6");
                    console.log(roleId);
                    e.target.style.backgroundColor="green"


                    setRegisterAs(true);
                  }}
                >
                  Teacher
                </MDBBtn>
                <MDBBtn
                  className="w-100 mb-4 "
                  size="md"
                  onClick={(e) => {
                    setRoleId("6775877359d1e574b0f67dfd");
                    setRegisterAs(true);
                    console.log(roleId);
                    e.target.style.backgroundColor="green"
                  }}
                >
                  Student
                </MDBBtn>
              </div>

              <MDBRow>
                <MDBCol col="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="User Name"
                    id="form1"
                    type="text"
                    onChange={(e) => {
                      // setUserInfo({ ...userInfo, userName: e.target.value });
                      setUserName(e.target.value);
                    }}
                  />
                  <div style={{display:"flex", columnGap:"5px"}}>
              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                id="form3"
                type="email"
                onChange={(e) => {
                  // setUserInfo({ ...userInfo, email: e.target.value });
                  setEmail(e.target.value);
                }}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form4"
                type="password"
                onChange={(e) => {
                  // setUserInfo({ ...userInfo, password: e.target.value });
                  setPassword(e.target.value);
                }}
              />
              </div>
                </MDBCol>
              </MDBRow>


              <MDBBtn className="w-100 mb-4" size="md" onClick={createRegister}>
                sign up
              </MDBBtn>
              {isRegister&&<p>{response.data.message}</p>}
              {error&&<p>{response.response.data.message}</p>}

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
export default Register 