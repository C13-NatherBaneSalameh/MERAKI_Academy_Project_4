import React from "react";
import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../App";
const Addlesson = () => {
  const { token } = useContext(UserContext);
  const headers = { Authorization: `Bearer ${token}` };

  // const [lessonInfo, setLessonInfo] = useState({})
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [video, setVideo] = useState();

  const { id } = useParams();
  console.log(id);

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

        setIsAdded(true);
        setIsError(false);
      })
      .catch((err) => {
        setError(err);
        setIsError(true);
        setIsAdded(false);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <textarea
        type="text"
        placeholder="Description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></textarea>
      <input
        placeholder="Video"
        onChange={(e) => {
          setVideo(e.target.value);
        }}
      />

      <button onClick={addNewLesson}> AddLesson</button>
      {isError && <p>{error.response.data.message}</p>}
      {isAdded && <p>{response.data.message}</p>}
    </div>
  );
};

export default Addlesson;
