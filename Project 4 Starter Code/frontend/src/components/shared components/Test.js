import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../App";
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
} from "mdb-react-ui-kit";

export default function App() {
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

  return (
    <>
      {!lessons0.length ? (
        <>
          {role === "teacher" && (
            <button onClick={addLessons}>addLesson</button>
          )}
          <p>no lesson yet</p>
        </>
      ) : (
        <>
          {role === "teacher" && (
            <button onClick={addLessons}>addLesson</button>
          )}
          {lesson?.map((ele, ind) => {
            return(
            <MDBCard style={{ maxWidth: "540px" }}>
              <MDBRow className="g-0">
                <MDBCol md="4">
                  <iframe
                    src={ele.video}
                    title="YouTube video"
                    allowfullscreen
                  ></iframe>
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                    <MDBCardTitle>{ele.title}</MDBCardTitle>
                    <MDBCardText>{ele.description}</MDBCardText>
                    <MDBCardText>
                      {ele.comments.map((o) => (
                        <p>comment : {o.comment}</p>
                      ))}
                    </MDBCardText>
                    <MDBInput
                      onChange={(e) => {
                        setComments({ ...comments, comment: e.target.value });
                      }}
                      label="Comment"
                      id="controlledValue"
                      type="text"
                    />
                    <MDBBtn
                      id={ele._id}
                      onClick={(e) => {
                        addComment(e.target.id);
                      }}
                    >
                      comment
                    </MDBBtn>
                    {role === "teacher" && (
                      <MDBBtn
                        className="mx-2"
                        color="danger"
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
                        <MDBInput
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
            )
          })}
        </>
      )}
    </>
  );
}
