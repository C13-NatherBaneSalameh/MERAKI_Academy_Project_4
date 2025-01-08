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
} from "mdb-react-ui-kit";
export const Favorite = () => {
  const toggleOpen = (e) => setIsOpen(!isOpen);
  const { token, role } = useContext(UserContext);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [favoritItem, setFavoritItem] = useState();
  const [lessonId, setlessonId] = useState("");
  const [showHide, setShowHide] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getAllFavorit = () => {
    axios
      .get("http://localhost:5000/lessons/fav/favorite", { headers })
      .then((res) => {
        setFavoritItem(res.data.favorite);
        console.log(res.data.favorite);

        console.log(favoritItem);
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
                  {/* <MDBIcon far id={ele._id}  icon="heart" className="m-2" onClick={(e)=>{
                      addToFavorite(ele._id)
                    }} style={{fontSize:"x-large"}} />

                    <MDBBtn id={ele._id} onClick={(e)=>{
                      deleteFavorite(e.target.id)
                    }}>delete</MDBBtn>
                     */}
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
                  alignItems: "start",
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
                  {/* {btnText} */}
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
                           
                            <p style={{ marginBottom: "0px", width: "50vw", display:"flex" }}>
                              {o.commenter.userName} : {o.comment}
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
                        {/* <div style={{ width: "80%" }}>
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
                        </div> */}
                        {/* <MDBBtn
                          style={{ height: "36px", width: "110.65px" }}
                          className="BtnComment"
                          id={ele._id}
                          onClick={(e) => {
                            addComment(e.target.id);
                          }}
                        >
                          comment
                        </MDBBtn> */}
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
