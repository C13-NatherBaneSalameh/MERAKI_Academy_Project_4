import React from "react";
import axios from "axios";
import { UserContext } from "../../../App";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { token, setCourse, course ,role} = useContext(UserContext);
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
    <div>
      {course?.map((ele, ind) => {
        return (
          <div
            id={ele.id}
            // onClick={(e) => {
            //   navigate(`/dashboard/${e.target.id}`);
            // }}
          >
            <img
              id={ele._id}
              src={ele.img}
              onClick={(e) => {
                console.log(e.target.id);
                
                navigate(`/dashboard/${e.target.id}`);
              }}
            />
            <p>{ele.title}</p>
            <p>{ele.description}</p>
            {role==="teacher"&& <button
              id={ele._id}
              onClick={(e) => {
                deleteCourseById(e.target.id);
              }}
            >
              X
            </button>}
           
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
