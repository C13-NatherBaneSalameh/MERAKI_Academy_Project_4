import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../../App";
const DashboardLseeons = () => {
  const { token, lesson, setLesson } = useContext(UserContext);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const addLessons = () => {
    navigate(`/addLesson/${id}`);
  };
  const getLessonsById = () => {
    axios
      .get(`http://localhost:5000/lessons/${id}`, { headers })
      .then((res) => {
        setLesson(res.data.lessone)
        console.log(res.data.lessone);
        
      })
      .catch((err)=>{
console.log(err);
      })
  };
  useEffect(() => {
    getLessonsById()
    
    
  }, [])
  

  return (
    <div>
        <div>
      <button onClick={addLessons}>addLesson</button>
      </div>
      <div>
        {lesson?.map((ele,ind)=>{
            return <div>
                <iframe src={ele.video} type="video/mp4"/>
                <p>{ele.title}</p>
                <p>{ele.description}</p>
            </div>
        })}

      </div>
    </div>
  );
};

export default DashboardLseeons;
