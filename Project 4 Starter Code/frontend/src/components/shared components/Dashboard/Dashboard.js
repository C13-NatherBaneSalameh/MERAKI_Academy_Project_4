import React from "react";
import axios from "axios";
import { UserContext } from "../../../App";
import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
// !!!!
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
  MDBIcon,
MDBFooter,

} from "mdb-react-ui-kit";

const Dashboard = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "duxfa6nqg",
        uploadPreset: "abc123",
      },
      function (err, res) {
        // console.log(res.info.url);

        if (res.info.url) {
          // setInfoCourse({ ...infoCourse, img : res.info.url});
          console.log("after", res.info.url);
          setImg(res.info.url);
        }
      }
    );
  }, []);

  const navigate = useNavigate();
  const {
    token,
    setCourse,
    course,
    role,
    setLessAdd,
    lessAdd,
    setCentredModal,
    centredModal,
    teacherId,
setTeacherId
  } = useContext(UserContext);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [infoCourse, setInfoCourse] = useState({});
  const [error, setError] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const [isError, setisError] = useState(false);
  const [response, setResponse] = useState("");
  const [isCloseModal, setIsCloseModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  // const [course, setCourse] = useState();
  const add = () => {
    axios
      .post(
        "http://localhost:5000/course/",
        { title: title, description: description, img: img },
        { headers }
      )
      .then((res) => {
        setResponse(res);
        setIsAdd(true);
        setisError(false);
        getAllCOurse();
      })
      .catch((err) => {
        console.log(err);
        setIsAdd(false);
        setError(err);
        setisError(true);
      });
  };
  const toggleOpen = () => {
    setCentredModal(!centredModal);
    setIsCloseModal(!isCloseModal);
    //!11111111111

    console.log(isCloseModal);
  };

  const getAllCOurse = () => {
    axios
      .get("http://localhost:5000/course/allCourse", { headers })
      .then((res) => {
        console.log(res);
        const data = res.data.courses;
        setCourse(res.data.courses);
        console.log(course);

        setTeacherId(res.data.teacherId);
        localStorage.setItem("teacherId",res.data.teacherId)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteCourseById = (id) => {
    console.log("bbbbb");

    axios
      .delete(`http://localhost:5000/course/${id}`, { headers })
      .then((res) => {
        console.log("555555");

        const courseAfterDelete = course.filter((ele) => ele._id !== id);
        setCourse(courseAfterDelete);
        console.log("course", course);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllCOurse();
  }, []);

  return (
    <>
    <MDBContainer fluid className="container courseDiv">
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
                  style={{ width: "80%", margin: "10px" }}
                  placeholder="Title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <input
                  style={{ width: "80%", margin: "10px" }}
                  type="text"
                  placeholder="Description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                
                <MDBBtn onClick={() => widgetRef.current.open()}>
                  {" "}
                  upload img
                </MDBBtn>
                {isAdd && <p>{response.data.message}</p>}
                {isError && <p>{error.response.data.message}</p>}
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={toggleOpen}>
                  Close
                </MDBBtn>
                <MDBBtn onClick={add}>Save changes</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </>
      {course?.map((ele, ind) => {
        return (
          <MDBCard
            className="card0 shadow-lg   mt-4 cont"
            style={{ height: "80%", width: "350px",border:"2px solid  #9fcfe6"}}
          >
            <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="bg-image hover-overlay"
            >
              <MDBCardImage
                className="rounded-top"
                id={ele._id}
                src={ele.img}
                style={{ width: "100%", height: "250px" }}
                onClick={(e) => {
                  console.log(e.target.id);
                  console.log("5555555");

                  navigate(`/dashboard/${e.target.id}`);
                }}
                fluid
                alt="..."
              />
              <a>
                <div
                  className="mask"
                  style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                ></div>
              </a>
            </MDBRipple>
            <MDBCardBody>
              <MDBCardTitle>{ele.title}</MDBCardTitle>
              <MDBCardText>{ele.description} </MDBCardText>
              {role === "teacher" && (
                <MDBBtn
                  className=" btn  btn-danger"
                  href="#"
                  id={ele._id}
                  onClick={(e) => {
                    deleteCourseById(e.target.id);
                  }}
                >
                  Delete
                </MDBBtn>
              )}
              <MDBBtn
                className="btn"
                href="#"
                id={ele._id}
                onClick={(e) => {
                  console.log(e.target.id);
                  setLessAdd(!lessAdd);
                  console.log(lessAdd);

                  navigate(`/dashboard/${e.target.id}`);
                }}
              >
                Show lesson
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        );
      })}
    
    </MDBContainer>
    <MDBFooter className='bg-light text-center text-white'>
      <MDBContainer className='p-4 pb-0'>
        <section className='mb-4'>
          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#3b5998' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#55acee' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='twitter' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#dd4b39' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='google' />
          </MDBBtn>
          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#ac2bac' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='instagram' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#0082ca' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#333333' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2020 Copyright:
        <a className='text-white' href='https://mdbootstrap.com/'>
        EasyLearning.com        </a>
      </div>
    </MDBFooter>
    </>
  );
};

export default Dashboard;
