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
  MDBIcon,
  MDBInputGroup,
  MDBContainer,
  MDBFooter,
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
  const [showHide, setShowHide] = useState(false);
  const [btnFav, setBtnFav] = useState(false);
  const [search, setSearch] = useState();

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
    teacherId,
    setTeacherId,
  } = useContext(UserContext);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const c = useNavigate();
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
        "https://easy-learning-1qtv.onrender.com/lessons",
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

  const toggleOpenn = () => setCentredModall(!centredModall);

  const getLessonsById = () => {
    axios
      .get(`https://easy-learning-1qtv.onrender.com/lessons/${id}`, { headers })
      .then((res) => {
        setLesson(res.data.lessone);
        console.log("lessons===>", res.data);
        setLessons0(res.data.lessone);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatedLesson = (id) => {
    axios
      .put(
        `https://easy-learning-1qtv.onrender.com/lessons/${id}`,
        { title: title, description: description, video: video },
        { headers }
      )
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

  //!!comment
  const addComment = (id) => {
    axios
      .post(`https://easy-learning-1qtv.onrender.com/comments/${id}`, comments, { headers })
      .then((res) => {
        getLessonsById();
        // setComments("")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCommentById = (id) => {
    console.log(id);
    console.log("hi");

    axios
      .delete(`https://easy-learning-1qtv.onrender.com/comments/${id}/delete`, { headers })
      .then((res) => {
        const lessonAfterDeleteComment = lesson.map((ele) => {
          return {
            ...ele,
            comments: ele.comments.filter((e) => e._id !== id),
          };
        });
        setLesson(lessonAfterDeleteComment);
        // setComments("")
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteLesson = (id) => {
    axios
      .delete(`https://easy-learning-1qtv.onrender.com/lessons/${id}`, { headers })
      .then((res) => {
        const lessonAfterDelete = lesson.filter((ele) => ele._id !== id);
        setLesson(lessonAfterDelete);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // TODO favorit function
  const addToFavorite = (id) => {
    console.log(token);

    console.log(headers);

    axios
      .post(
        `https://easy-learning-1qtv.onrender.com/lessons/${id}/favorite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setResponse(res);
        console.log(res);
      })
      .catch((err) => {
        setError(err);
      });
  };
  // !!!delete
  const deleteFavorite = (id) => {
    console.log("llllllllllllllll", id);

    axios
      .delete(`https://easy-learning-1qtv.onrender.com/lessons/${id}/favorite`, { headers })
      .then((res) => {
        console.log("sucsess", res);
        console.log(55555555);
      })
      .catch((err) => {
        console.log("bad", err);
      });
  };
  //TODO search =============================
  const getLessonsByIdTitle = () => {
    axios
      .get(`https://easy-learning-1qtv.onrender.com/lessons/${id}/search?title=${search}`, {
        headers,
      })
      .then((res) => {
        console.log(res);

        setLesson(res.data.lessone);
        // console.log("lessons===>", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (search) {
      getLessonsByIdTitle();
    } else {
      getLessonsById();
    }
  }, [search]);
  return (
    <div style={{display:"flex",flexDirection:"column" ,minHeight:"100vh"}}>
      <>
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
        <div style={{display:"flex",flexDirection:"column",flex:"1"}}>
          {role === "teacher" && (
            <div
              className="mt-2 me-2"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <MDBBtn onClick={addLessons} className=" ms-2">
                addLesson
              </MDBBtn>
              <MDBInputGroup style={{ width: "30%" }}>
                <MDBInput
                  className="search"
                  label="Search"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <MDBBtn rippleColor="dark">
                  <MDBIcon
                    icon="search"
                    onClick={(e) => {
                      getLessonsByIdTitle();
                    }}
                  />
                </MDBBtn>
              </MDBInputGroup>
            </div>
          )}

          <br />
          <br />
          <br />

          <p style={{ fontSize: "50px" }}>No lessons yet!</p>
        </div>
      ) : (
        <>
          {role === "teacher" && (
            <div
              className="mt-2 me-2"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <MDBBtn onClick={addLessons} className=" ms-2">
                addLesson
              </MDBBtn>
              <MDBInputGroup style={{ width: "30%" }}>
                <MDBInput
                  className="search"
                  label="Search"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <MDBBtn rippleColor="dark">
                  <MDBIcon
                    icon="search"
                    onClick={(e) => {
                      getLessonsByIdTitle();
                    }}
                  />
                </MDBBtn>
              </MDBInputGroup>
            </div>
          )}

          {role === "student" && (
            <div
              className="mt-2 me-2"
              style={{ display: "flex", justifyContent: "end" }}
            >
              <MDBInputGroup style={{ width: "30%" }}>
                <MDBInput
                  className="search"
                  label="Search"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <MDBBtn rippleColor="dark">
                  <MDBIcon
                    icon="search"
                    onClick={(e) => {
                      getLessonsByIdTitle();
                    }}
                  />
                </MDBBtn>
              </MDBInputGroup>
            </div>
          )}

          {lesson?.map((ele, ind) => {
            return (
              <main style={{flex:"1"}}>
              <MDBCard
                style={{
                  maxWidth: "70%",
                  height: "50%",
                  border: "2px solid #9fcfe6",
                  marginTop: "20px",
                  
                }}
                className="container shadow-lg"
              >
                <MDBRow className="g-0 ">
                  <MDBCol md="4" style={{ width: "30%" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: " flex-start",
                      }}
                    >
                      <iframe
                        className="mt-3 mb-3 video-frame"
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

                      {role === "student" && (
                        <MDBBtn
                          className="m-2"
                          id={ele._id}
                          onClick={(e) => {
                            if (e.target.innerText === "FAV") {
                              addToFavorite(ele._id);
                            } else {
                              deleteFavorite(e.target.id);
                            }
                            setlessonId(e.target.id);

                            setBtnFav(!btnFav);
                          }}
                        >
                          {btnFav && ele._id === lessonId ? (
                            <>REMOV</>
                          ) : (
                            <>FAV</>
                          )}
                        </MDBBtn>
                      )}
                    </div>
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
                      alignItems: "end",
                    }}
                  >
                    <MDBBtn
                      id={ele._id}
                      onClick={(e) => {
                        toggleOpen(e);
                        setlessonId(e.target.id);
                        console.log(e.target.innerText);

                        setShowHide(!showHide);
                      }}
                      className="mt-2  btn-primary"
                      style={{ width: "40%" }}
                    >
                      {showHide && ele._id === lessonId ? (
                        <>Hide Comment</>
                      ) : (
                        <>Show Comment</>
                      )}
                    </MDBBtn>

                    {/* !!!! */}
                    {isClickedToUpdate && ele._id === lessonId ? (
                      <div className="mt-2">
                        <MDBInput
                          className="mt-3"
                          // !!!
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                          label="title"
                          id="controlledValue"
                          type="text"
                        />
                        <MDBInput
                          className="mt-2"
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                          label="description"
                          id="controlledValue"
                          type="text"
                        />

                        <MDBBtn
                          className="mt-2"
                          onClick={() => widgetRef.current.open()}
                        >
                          upload video
                        </MDBBtn>
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
                      <div
                        style={{
                          marginBottom: "10px",
                          display: "flex",

                          flexDirection: "column",
                        }}
                      >
                        {" "}
                        <div style={{ marginBottom: "10px" }}>
                          <MDBCollapse open={isOpen}>
                            <MDBCardText>
                              {ele.comments.map((o) => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "start",
                                  }}
                                >
                                  {" "}
                                  <p
                                    style={{
                                      marginBottom: "0px",
                                      width: "65vw",
                                      display: "flex",
                                      justifyContent: "space-between",
                                     
                                    }}
                                    className="mt-2 text-break"
                                  >
                                    {o.commenter.userName} : {o.comment}{" "}
                                    <div style={{ width: "50%" }}>
                                      {(teacherId === o.commenter._id ||
                                        role === "teacher") && (
                                        <MDBBtn floating tag="a" color="danger">
                                          <MDBIcon
                                            id={o._id}
                                            far
                                            icon="trash-alt"
                                            onClick={(e) => {
                                              deleteCommentById(e.target.id);
                                            }}
                                          />
                                        </MDBBtn>
                                      )}
                                    </div>
                                  </p>{" "}
                                  <br></br>
                                </div>
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
                                  style={{ width: "55vw" }}
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
                      </div>
                    )}
                  </MDBCol>
                </MDBRow>
              </MDBCard>
              </main>
            );
          })}
        </>
      )}
      <MDBFooter
        className="bg-light text-center text-white"
      >
        <MDBContainer className="p-4 pb-0">
          <section className="mb-4">
            <MDBBtn
              floating
              className="m-1"
              style={{ backgroundColor: "#3b5998" }}
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="facebook-f" />
            </MDBBtn>

            <MDBBtn
              floating
              className="m-1"
              style={{ backgroundColor: "#55acee" }}
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="twitter" />
            </MDBBtn>

            <MDBBtn
              floating
              className="m-1"
              style={{ backgroundColor: "#dd4b39" }}
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="google" />
            </MDBBtn>
            <MDBBtn
              floating
              className="m-1"
              style={{ backgroundColor: "#ac2bac" }}
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="instagram" />
            </MDBBtn>

            <MDBBtn
              floating
              className="m-1"
              style={{ backgroundColor: "#0082ca" }}
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="linkedin-in" />
            </MDBBtn>

            <MDBBtn
              floating
              className="m-1"
              style={{ backgroundColor: "#333333" }}
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="github" />
            </MDBBtn>
          </section>
        </MDBContainer>

        <div 
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)"}}
        >
          © 2020 Copyright:
          <a className="text-white" href="https://mdbootstrap.com/">
            EasyLearning.com
          </a>
        </div>
      </MDBFooter>
    </div>
  );
};

export default DashboardLseeons;
