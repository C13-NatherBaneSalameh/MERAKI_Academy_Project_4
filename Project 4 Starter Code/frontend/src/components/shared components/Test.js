import React from "react";
import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from "mdb-react-ui-kit";

export default function App() {
  const { token, centredModall, setCentredModall } = useContext(UserContext);
  const headers = { Authorization: `Bearer ${token}` };

  // const [lessonInfo, setLessonInfo] = useState({})
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [video, setVideo] = useState();

  const { id } = useParams();
  console.log(id);

  const addNewLesson = () => {
    // setLessonInfo({...lessonInfo,courseId:id})

    console.log(id);
    // console.log( "info",lessonInfo);

    axios
      .post(
        "http://localhost:5000/lessons",
        { title: title, courseId: id, description: description, video: video },
        { headers }
      )
      .then((res) => {
        console.log("res lesson", res);

        setResponse(res);
        console.log(response);

        setIsAdded(true);
        setIsError(false);
      })
      .catch((err) => {
        setError(err);
        setIsError(true);
        setIsAdded(false);
      });
  };
  // const [centredModall, setCentredModall] = useState(false);

  const toggleOpen = () => setCentredModall(!centredModall);

  return (
    <>
      {/* <MDBBtn onClick={toggleOpen}>Vertically centered modal</MDBBtn> */}

      <MDBModal
        tabIndex="-1"
        open={centredModall}
        onClose={() => setCentredModall(false)}
      >
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add Lessons</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBInput
                wrapperClass="mb-4"
                label="title"
                id="form4"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Description"
                id="form4"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
               <MDBInput
                wrapperClass="mb-4"
                label="Video"
                id="form4"
                onChange={(e) => {
                  setVideo(e.target.value);
                }}
              />
               {isError && <p>{error.response.data.message}</p>}
               {isAdded && <p>{response.data.message}</p>}
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleOpen}>
                Close
              </MDBBtn>
              <MDBBtn  onClick={addNewLesson}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
