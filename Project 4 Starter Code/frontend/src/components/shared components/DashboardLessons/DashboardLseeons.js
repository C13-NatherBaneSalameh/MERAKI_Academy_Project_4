import axios from "axios";
import React, { useEffect, useRef } from "react";
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
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "duxfa6nqg",
        uploadPreset: "123abc",
      },
      function (err, res) {
        console.log(res.info.url);

        if (res.info.url) {
          // setInfoCourse({ ...infoCourse, img : res.info.url});
          console.log("after", res.info.url);
          setVideo(res.info.url);
        }
      }
    );
  }, []);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (e) => setIsOpen(!isOpen);
  const [isClickedToUpdate, setIsClickedToUpdate] = useState(false);
  const [newInfoLessons, setNewInfoLessons] = useState({});
  const [comments, setComments] = useState({});
  const [lessons0, setLessons0] = useState([]);
  const [lessonId, setlessonId] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [video, setVideo] = useState();
  
  const {
    token,
    lesson,
    setLesson,
    role,
    setCentredModal,
    centredModal,
    userName,
    setUserName,
    centredModall,
    setCentredModall,
  } = useContext(UserContext);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const addLessons = () => {
    setCentredModall(!centredModall);
  };
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
        getLessonsById();

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
      .put(`http://localhost:5000/lessons/${id}`, {title:title,description:description ,video:video}, { headers })
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
                {/* <MDBInput
                wrapperClass="mb-4"
                label="Video"
                id="form4"
                onChange={(e) => {
                  setVideo(e.target.value);
                }}
              /> */}

                <MDBBtn
                  onClick={() => {
                    console.log("hhhhhhhhhhhhhhhhhh");

                    widgetRef.current.open();
                  }}
                >
                  uplode video
                </MDBBtn>
                {isError && <p>{error.response.data.message}</p>}
                {isAdded && <p>{response.data.message}</p>}
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={toggleOpenn}>
                  Close
                </MDBBtn>
                <MDBBtn onClick={addNewLesson}>Save changes</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </>

      {!lessons0.length ? (
        <>
          {role === "teacher" && (
            <MDBBtn onClick={addLessons} style={{ marginTop: "10px", marginLeft:"1200px" }}>
              addLesson
            </MDBBtn>
          )}
          <br/>
          <br/>
          <br/>
          
          <p style={{fontSize:"50px"}}>No lessons yet!</p>
        </>
      ) : (
        <>
          {role === "teacher" && (
            <MDBBtn onClick={addLessons} style={{ marginTop: "10px" , marginLeft:"1220px"}}>
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
                      className="mt-3 video-frame"
                      style={{
                        height: "150px",
                        width: "100%",
                        transition: "all 0.3s ease",
                      }}
                      src={ele.video}
                      title="YouTube video"
                      allowFullScreen
                      onClick={(e) => {
                        e.target.style.height = "500px";
                        e.target.style.width = "100%";
                      }}
                      onDoubleClick={(e) => {
                        e.target.style.height = "150px";
                        e.target.style.width = "100%";
                      }}
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
                      alignItems:"end"
                    }}
                  >
                    <MDBBtn
                      id={ele._id}
                      onClick={(e) => {
                        toggleOpen(e);
                        setlessonId(e.target.id);
                      }}
                      className="mt-2  btn-primary"
                      style={{ width: "40%" }}
                    >
                      Show Comment
                    </MDBBtn>
                    
{/* 
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
                    )} */}
                    {/* !!!! */}
                    {isClickedToUpdate && ele._id === lessonId ? (
                      <div className="mt-2" >
                        <MDBInput
                          className="mt-3"
                          // !!!
                          // style={{width:"90vw"}}
                          onChange={(e) => {
                            // setNewInfoLessons({
                            //   ...newInfoLessons,
                            //   title: e.target.value,
                            // });
                            setTitle(e.target.value)
                          }}
                          label="title"
                          id="controlledValue"
                          type="text"
                        />
                        <MDBInput
                          className="mt-2"
                          onChange={(e) => {
                            // setNewInfoLessons({
                            //   ...newInfoLessons,
                            //   description: e.target.value,
                            // });
                            setDescription(e.target.value)
                          }}
                          label="description"
                          id="controlledValue"
                          type="text"
                        />

                        {/* <MDBInput
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
                        /> */}
                        <MDBBtn className="mt-2" onClick={()=>widgetRef.current.open()}>upload video</MDBBtn>
                        <div className="mt-2">

                        <MDBBtn
                          className="mb-2"
                          id={ele._id}
                          onClick={(e) => {
                            updatedLesson(e.target.id);
                          }}
                        >
                          Update
                        </MDBBtn>
                        </div>
                      </div>
                    ) : (
                      <>
                        {role === "teacher" && (
                          <MDBBtn
                            style={{ width: "40%" }}
                            id={ele._id}
                            className="mt-2"
                            onClick={(e) => {
                              setlessonId(e.target.id);
                              setIsClickedToUpdate(true);
                            }}
                          >
                            update
                          </MDBBtn>
                        )}
                      </>
                    )}
                    
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
                    {ele._id === lessonId && (
                      <div style={{ marginBottom: "10px" }}>
                        <MDBCollapse open={isOpen}>
                          <MDBCardText >
                            {ele.comments.map((o) => (
                             <div style={{display:"flex",justifyContent:"start"}}> <p style={{ marginBottom: "0px" }}>
                                {userName} : {o.comment}
                              </p> <br></br></div>
                            ))}
                          </MDBCardText>
                          <div
                            style={{
                              display: "flex",
                              marginBottom: "10px",
                              width: "80%",
                            }}
                          >
                            <div style={{ width: "80%" }}>
                              <MDBInput 
                              style={{width:"55vw"}}
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
                      </div>
                    )}
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
