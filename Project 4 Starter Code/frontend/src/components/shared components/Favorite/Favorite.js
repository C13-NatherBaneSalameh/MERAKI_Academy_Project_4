import React from "react";
import axios from "axios";
import { UserContext } from "../../../App";
import { useContext, useState, useEffect } from "react";
import "./style.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCollapse,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
export const Favorite = () => {
  const toggleOpen = (e) => setIsOpen(!isOpen);
  const { token, role, lesson, teacherId, setLesson } = useContext(UserContext);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [favoritItem, setFavoritItem] = useState();
  const [lessonId, setlessonId] = useState("");
  const [showHide, setShowHide] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState({});

  const getAllFavorit = () => {
    axios
      .get("https://easy-learning-1qtv.onrender.com/lessons/fav/favorite", { headers })
      .then((res) => {
        setFavoritItem(res.data.favorite);
        console.log(res);

        console.log(favoritItem);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteFavorite = (id) => {
    console.log("llllllllllllllll", id);

    axios
      .delete(`https://easy-learning-1qtv.onrender.com/lessons/${id}/favorite`, { headers })
      .then((res) => {
        console.log("sucsess", res);
        console.log(55555555);
        const FavoritAfterDElete = favoritItem.filter((ele) => {
          return ele.favItem._id !== id;
        });
        setFavoritItem(FavoritAfterDElete);
      })
      .catch((err) => {
        console.log("bad", err);
      });
  };
  const addComment = (id) => {
    axios
      .post(`https://easy-learning-1qtv.onrender.com/comments/${id}`, comments, { headers })
      .then((res) => {
        getAllFavorit();
        setComments("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteCommentById = (id) => {
    axios
      .delete(`https://easy-learning-1qtv.onrender.com/comments/${id}/delete`, { headers })
      .then((res) => {
        const afterDelete = favoritItem.map((ele) => {
          return {
            ...ele,
            favItem: {
              ...ele.favItem,
              comments: ele.favItem.comments.filter((o) => o._id !== id),
            },
          };
        });
        setFavoritItem(afterDelete);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllFavorit();
  }, []);
  return (
    <div>
      {favoritItem?.map((ele, ind) => {
        console.log(ele);

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
                    src={ele.favItem.video}
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
                  {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}

                  <MDBBtn
                    className="m-2"
                    id={ele.favItem._id}
                    onClick={(e) => {
                      deleteFavorite(e.target.id);
                    }}
                  >
                    remove
                  </MDBBtn>
                </div>
              </MDBCol>
              <MDBCol md="8" style={{ width: "30%" }}>
                <MDBCardBody>
                  <MDBCardTitle>{ele.favItem.title}</MDBCardTitle>
                  <MDBCardText>{ele.favItem.description}</MDBCardText>
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
                {ele._id === lessonId && (
                  <div style={{ marginBottom: "10px" }}>
                    <MDBCollapse open={isOpen}>
                      <MDBCardText>
                        {ele.favItem.comments.map((o) => (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "start",
                            }}
                          >
                            <p
                              style={{
                                marginBottom: "0px",
                                width: "65vw",
                                display: "flex",
                                justifyContent: "space-between",

                              }}
                            >
                              {o.commenter.userName} : {o.comment}
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
                            </p>
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
                          id={ele.favItem._id}
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
    </div>
  );
};
