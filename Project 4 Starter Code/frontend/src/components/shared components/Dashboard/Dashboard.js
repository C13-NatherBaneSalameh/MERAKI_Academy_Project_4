import React from "react";
import axios from "axios";
import { UserContext } from "../../../App";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";

const Dashboard = () => {
  const navigate = useNavigate();
  const { token, setCourse, course, role ,setLessAdd,lessAdd
  } = useContext(UserContext);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [response, setresponse] = useState("");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  // const [course, setCourse] = useState();
  const [teacherId, setTeacherId] = useState();
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
      {course?.map((ele, ind) => {
        return (
            <MDBCard className=" gg mt-4"
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
