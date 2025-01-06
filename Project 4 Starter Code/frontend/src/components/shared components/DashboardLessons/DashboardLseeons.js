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
} from "mdb-react-ui-kit";
const DashboardLseeons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (e) => setIsOpen(!isOpen);
  const [isClickedToUpdate, setIsClickedToUpdate] = useState(false);
  const [newInfoLessons, setNewInfoLessons] = useState({});
  const [comments, setComments] = useState({});
  const [lessons0, setLessons0] = useState([]);
  const { token, lesson, setLesson, role, setCentredModal, centredModal } =
    useContext(UserContext);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const addLessons = () => {
    navigate(`/addLesson/${id}`);
    // setCentredModal(true)
  };
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

  return (
    <>
      {!lessons0.length ? (
        <>
          {role === "teacher" && (
            <button onClick={addLessons} style={{ marginTop: "10px" }}>
              addLesson
            </button>
          )}
          <p>no lesson yet</p>
        </>
      ) : (
        <>
          {role === "teacher" && (
            <button onClick={addLessons} style={{ marginTop: "10px" }}>
              addLesson
            </button>
          )}
          {lesson?.map((ele, ind) => {
            return (
              
              <MDBCard
                style={{
                  
                  maxWidth: "70%",
                  height:"50%",
                  border: "2px solid",
                  marginTop: "10px",
                }}
                className="container"
              >
                <MDBRow className="g-0 ">
                  <MDBCol md="4" style={{ width: "40%" }}>
                    <iframe
                      className="mt-5"
                      style={{ height: "330px", width: "100%" }}
                      src={ele.video}
                      title="YouTube video"
                      allowfullscreen
                    ></iframe>
                  </MDBCol>
                  <MDBCol md="8" style={{ width: "60%" }}>
                    <MDBCardBody>
                      <MDBCardTitle>{ele.title}</MDBCardTitle>
                      <MDBCardText>{ele.description}</MDBCardText>
                      <MDBBtn onClick={toggleOpen}>Show Comment</MDBBtn>

                      <div style={{  marginBottom: "10px"  }}>
                    

                        
                          <MDBCollapse open={isOpen}>
                          <MDBCardText>
                            
                        {ele.comments.map((o) => (
                          <p>comment : {o.comment}</p>
                        ))}
                        
                      </MDBCardText>
                      <div  style={{ display: "flex", marginBottom: "10px" ,width:"800px" }}>
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
                      {role === "teacher" && (
                        <MDBBtn
                  
                      className="mb-2"                          color="danger"
                          id={ele._id}
                          onClick={(e) => {
                            deleteLesson(e.target.id);
                          }}
                        >
                          delete
                        </MDBBtn>
                      )}
                      {isClickedToUpdate ? (
                        <>
                  
                          <MDBInput className="mb-2"
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
                          <MDBInput className="mb-2"
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

                          <MDBInput className="mb-2"
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
                          <MDBBtn className="mb-2"
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
                          {role === "teacher" && (
                            <MDBBtn
                              className="mb-2"
                              onClick={() => {
                                setIsClickedToUpdate(true);
                              }}
                            >
                              update
                            </MDBBtn>
                          )}
                        </>
                      )}
                    </MDBCardBody>
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
