import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../../../App";
import "./style.css";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import Dashboard from "../Dashboard/Dashboard";


const AddCourse = () => {
  const { token, setCourseId, courseId,setCentredModal,
    centredModal } = useContext(UserContext);
  const headers = { Authorization: `Bearer ${token}` };

  const [infoCourse, setInfoCourse] = useState({});
  const [error, setError] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const [isError, setisError] = useState(false);
  const [response, setResponse] = useState("");
  const [isCloseModal, setIsCloseModal] = useState(false)

  const add = () => {
    axios
      .post("http://localhost:5000/course/", infoCourse, { headers })
      .then((res) => {
        setResponse(res);
        setIsAdd(true);
        setisError(false);
      })
      .catch((err) => {
        console.log(err);
        setIsAdd(false);
        setError(err);
        setisError(true);
      });
  };

  const toggleOpen = () =>{setCentredModal(!centredModal)
    setIsCloseModal(true)
    console.log(isCloseModal);
    

  } ;

  return (
    <>
      {/* <MDBBtn onClick={toggleOpen}>Vertically centered modal</MDBBtn> */}

      <MDBModal
        tabIndex="-1"
        open={centredModal}

        onClose={() => setCentredModal(false)}
      >
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add Course</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            <input
        type="text"
        style={{width:"80%", margin:"10px"}}
        placeholder="Title"
        onChange={(e) => {
          setInfoCourse({ ...infoCourse, title: e.target.value });
        }}
      />
       <input
        style={{width:"80%", margin:"10px"}}

        type="text"
        placeholder="Description"
        onChange={(e) => {
          setInfoCourse({ ...infoCourse, description: e.target.value });
        }}
      />
       <input
               style={{width:"80%", margin:"10px"}}

        placeholder="Image"
        onChange={(e) => {
          setInfoCourse({ ...infoCourse, img: e.target.value });
        }}
        
      />
        {isAdd && <p>{response.data.message}</p>}
        {isError && <p>{error.response.data.message}</p>}
        {isCloseModal&& <Dashboard />}
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleOpen}>
                Close
              </MDBBtn>
              <MDBBtn  onClick={add} >Save changes</MDBBtn>
            
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default AddCourse;
