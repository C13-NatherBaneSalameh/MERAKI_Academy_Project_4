import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../../App";
import "../../../App.css";
import "./style.css";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCollapse,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
const DashboardLseeons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (e) => setIsOpen(!isOpen);
  const [isClickedToUpdate, setIsClickedToUpdate] = useState(false);
  const [newInfoLessons, setNewInfoLessons] = useState({});
  const [comments, setComments] = useState({});
  const [lessons0, setLessons0] = useState([]);
  const [lessonId, setlessonId] = useState("")
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [video, setVideo] = useState();
  const { token, lesson, setLesson, role, setCentredModal, centredModal,userName,
    setUserName ,centredModall,
    setCentredModall} =
    useContext(UserContext);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const addLessons = () => {
    // navigate(`/addLesson/${id}`);
    // setCentredModall(true)
    setCentredModall(!centredModall)  };
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

  const toggleOpenn = () => setCentredModall(!centredModall);

  const getLessonsById = () => {
    axios
      .get(`http://localhost:5000/lessons/${id}`, { headers })
      .then((res) => {
        setLesson(res.data.lessone);
        console.log(res.data.lessone);
        setLessons0(res.data.lessone);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatedLesson = (id) => {
    axios
      .put(`http://localhost:5000/lessons/${id}`, newInfoLessons, { headers })
      .then((res) => {
        const lessoneAfterUpdate = lesson.map((ele, ind) => {
          if (ele._id === res.data.lesson._id) {
            ele.title = res.data.lesson.title;
            ele.description = res.data.lesson.description;
            ele.video = res.data.lesson.video;
          }
          return ele;
        });
        setLesson(lessoneAfterUpdate);
        setIsClickedToUpdate(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addComment = (id) => {
    axios
      .post(`http://localhost:5000/comments/${id}`, comments, { headers })
      .then((res) => {
        getLessonsById();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteLesson = (id) => {
    axios
      .delete(`http://localhost:5000/lessons/${id}`, { headers })
      .then((res) => {
        const lessonAfterDelete = lesson.filter((ele) => ele._id !== id);
        setLesson(lessonAfterDelete);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getLessonsById();
  }, []);
  // if (!lessons0.length) {
  //   return (
  //     <div>
  //       <div>
  //         <button onClick={addLessons}>addLesson</button>
  //       </div>
  //       <p>no lesson yet</p>
  //     </div>
  //   );
  // }
// 
  return (
    <>
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
                onClick={toggleOpenn}
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
              <MDBBtn color="secondary" onClick={toggleOpenn}>
                Close
              </MDBBtn>
              <MDBBtn  onClick={addNewLesson}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  
      {!lessons0.length ? (
        <>
          {role === "teacher" && (
            <MDBBtn onClick={addLessons} style={{ marginTop: "10px" }}>
              addLesson
            </MDBBtn>
          )}
          <p>no lesson yet</p>
        </>
      ) : (
        <>
          {role === "teacher" && (
            <MDBBtn onClick={addLessons} style={{ marginTop: "10px" }}>
              addLesson
            </MDBBtn>
          )}
          {lesson?.map((ele, ind) => {
            return (
              <MDBCard
                style={{
                  maxWidth: "70%",
                  height: "50%",
                  border: "2px solid",
                  marginTop: "10px",
                }}
                className="container"
              >
                <MDBRow className="g-0 ">
                  <MDBCol md="4" style={{ width: "30%" }}>
                    <iframe
                      className="mt-3"
                      style={{ height: "150px", width: "100%" }}
                      src={ele.video}
                      title="YouTube video"
                      allowfullscreen
                    ></iframe>
                  </MDBCol>
                  <MDBCol md="8" style={{ width: "30%" }}>
                    <MDBCardBody>
                      <MDBCardTitle>{ele.title}</MDBCardTitle>
                      <MDBCardText>{ele.description}</MDBCardText>
                    </MDBCardBody>
                  </MDBCol>
                  <MDBCol
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      columnGap: "10px",
                    }}
                  >
                   <MDBBtn
                    id={ele._id}
                      onClick={(e)=>{
                        toggleOpen(e)
                        setlessonId(e.target.id)

                      }}
                      className="mt-2  btn-primary"
                      style={{ width: "40%" }}
                    >
                      Show Comment
                    </MDBBtn>
                    
                    {role === "teacher" && (
                      <MDBBtn
                        style={{ width: "40%" }}
                        className="mt-2"
                        color="danger"
                        id={ele._id}
                        onClick={(e) => {
                          deleteLesson(e.target.id);
                        }}
                      >
                        delete
                      </MDBBtn>
                    )}
                    {isClickedToUpdate &&ele._id===lessonId  ? (
                      <>
                        <MDBInput
                          className="mb-2"
                          onChange={(e) => {
                            setNewInfoLessons({
                              ...newInfoLessons,
                              title: e.target.value,
                            });
                          }}
                          label="title"
                          id="controlledValue"
                          type="text"
                        />
                        <MDBInput
                          className="mb-2"
                          onChange={(e) => {
                            setNewInfoLessons({
                              ...newInfoLessons,
                              description: e.target.value,
                            });
                          }}
                          label="description"
                          id="controlledValue"
                          type="text"
                        />

                        <MDBInput
                          className="mb-2"
                          onChange={(e) => {
                            setNewInfoLessons({
                              ...newInfoLessons,
                              video: e.target.value,
                            });
                          }}
                          label="video "
                          id="controlledValue"
                          type="text"
                        />
                        <MDBBtn
                          className="mb-2"
                          id={ele._id}
                          onClick={(e) => {
                            updatedLesson(e.target.id);
                          }}
                        >
                          Update
                        </MDBBtn>
                      </>
                    ) : (
                      <>
                        {role === "teacher" &&  (
                          <MDBBtn
                            style={{ width: "40%" }}
                        id={ele._id}
                            className="mt-2"
                            onClick={(e) => {
                              setlessonId(e.target.id)
                              setIsClickedToUpdate(true);
                            }}
                          >
                            update
                          </MDBBtn>
                        )}
                      </>
                    )}
                   {ele._id===lessonId&&
                    <div style={{ marginBottom: "10px" }}>
                      <MDBCollapse open={isOpen}>
                        <MDBCardText>
                          {ele.comments.map((o) => (
                            <p style={{ marginBottom: "0px" }}>
                              {userName} : {o.comment}
                            </p>
                          ))}
                        </MDBCardText>
                        <div
                          style={{
                            display: "flex",
                            marginBottom: "10px",
                            width: "100% ",
                          }}
                        >
                          <div style={{ width: "80%" }}>
                            <MDBInput
                              className="inpComment"
                              //!1111111
                              onChange={(e) => {
                                setComments({
                                  ...comments,
                                  comment: e.target.value,
                                });
                              }}
                              label="Comment"
                              id="controlledValue"
                              type="text"
                            />
                          </div>
                          <MDBBtn
                            style={{ height: "36px", width: "110.65px" }}
                            className="BtnComment"
                            id={ele._id}
                            onClick={(e) => {
                              addComment(e.target.id);
                            }}
                          >
                            comment
                          </MDBBtn>
                        </div>
                      </MDBCollapse>
                    </div>}
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            );
          })}
        </>
      )}
    </>
  );
};

export default DashboardLseeons;
