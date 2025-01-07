import React from "react";
import axios from "axios";
import { UserContext } from "../../../App";
import { useState, useContext, useEffect } from "react";
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
} from "mdb-react-ui-kit";

const Dashboard = () => {
  const navigate = useNavigate();
  const { token, setCourse, course, role ,setLessAdd,lessAdd,setCentredModal,centredModal
  } = useContext(UserContext);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [infoCourse, setInfoCourse] = useState({});
  const [error, setError] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const [isError, setisError] = useState(false);
  const [response, setResponse] = useState("");
  const [isCloseModal, setIsCloseModal] = useState(false)
  // const [course, setCourse] = useState();
  const [teacherId, setTeacherId] = useState();
  const add = () => {
    axios
      .post("http://localhost:5000/course/", infoCourse, { headers })
      .then((res) => {
        setResponse(res);
        setIsAdd(true);
        setisError(false);
        getAllCOurse()
        
      
      })
      .catch((err) => {
        console.log(err);
        setIsAdd(false);
        setError(err);
        setisError(true);
      });
  };
  const toggleOpen = () =>{
    setCentredModal(!centredModal)
    setIsCloseModal(!isCloseModal)
    //!11111111111

    console.log(isCloseModal);
    

  } ;

  const getAllCOurse = () => {
    axios
      .get("http://localhost:5000/course/allCourse", { headers })
      .then((res) => {
        console.log(res);
        console.log("gggggg");
        const data = res.data.courses;
        console.log("dddd", data);
        setCourse(res.data.courses);
        console.log(course);


        setTeacherId(res.data.teacherId);
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
    
    <div className="container courseDiv">
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
      {course?.map((ele, ind) => {
        return (
            <MDBCard className="card0 gg mt-4"
            style={{height:"80%",width:"350px"}}
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
                  style={{ width: "100%" }}
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
                <MDBBtn className="btn"  href="#"
                    id={ele._id}
                    onClick={(e) => {
                      console.log(e.target.id);
                      setLessAdd(!lessAdd)
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
    </div>
  );
};

export default Dashboard;
