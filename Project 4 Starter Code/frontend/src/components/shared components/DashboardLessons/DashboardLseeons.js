import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../../App";
const DashboardLseeons = () => {
  const [isClickedToUpdate, setIsClickedToUpdate] = useState(false);
  const [newInfoLessons, setNewInfoLessons] = useState({});
  const [comments, setComments] = useState({});
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
        setLesson(res.data.lessone);
        console.log(res.data.lessone);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getLessonsById();
  }, []);
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
    .then((res)=>{
      getLessonsById()

    })
    .catch((err)=>{
      console.log(err);
      

    })
  
  };
  const deleteLesson=(id)=>{
    axios
    .delete(`http://localhost:5000/lessons/${id}` , { headers })
    .then((res)=>{
     const lessonAfterDelete= lesson.filter((ele)=>ele._id!==id)
     setLesson(lessonAfterDelete)


    })
    .catch((err)=>{
      console.log(err);
      
    })

  }

  return (
    <div>
      <div>
        <button onClick={addLessons}>addLesson</button>
      </div>
      <div>
        {lesson?.map((ele, ind) => {
          return (
            <div>
              <iframe src={ele.video} type="video/mp4" />
              <p>{ele.title}</p>
              <p>{ele.description}</p>
              {ele.comments.map(o=><p>comment : {o.comment}</p>)}


              <textarea
                placeholder="Comment"
                onChange={(e) => {
                  setComments({ ...comments, comment: e.target.value });
                }}
              ></textarea>
              <button
                id={ele._id}
                onClick={(e) => {
                  addComment(e.target.id);
                }}
              >
                comment
              </button>
              <button id={ele._id} onClick={(e)=>{deleteLesson(e.target.id)}}>X</button>

              {isClickedToUpdate ? (
                <div>
                  <input
                    type="text"
                    placeholder="title"
                    onChange={(e) => {
                      setNewInfoLessons({
                        ...newInfoLessons,
                        title: e.target.value,
                      });
                    }}
                  />
                  <textarea
                    typeof="text"
                    placeholder="description"
                    onChange={(e) => {
                      setNewInfoLessons({
                        ...newInfoLessons,
                        description: e.target.value,
                      });
                    }}
                  ></textarea>
                  <input
                    placeholder="video"
                    onChange={(e) => {
                      setNewInfoLessons({
                        ...newInfoLessons,
                        video: e.target.value,
                      });
                    }}
                  />
                  <button
                    id={ele._id}
                    onClick={(e) => {
                      updatedLesson(e.target.id);
                    }}
                  >
                    {" "}
                    Update
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsClickedToUpdate(true);
                  }}
                >
                  {" "}
                  update{" "}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardLseeons;
