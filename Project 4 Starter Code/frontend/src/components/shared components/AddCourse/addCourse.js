import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../../../App";
import "./style.css";

const AddCourse = () => {
  const { token, setCourseId, courseId } = useContext(UserContext);
  const headers = { Authorization: `Bearer ${token}` };

  const [infoCourse, setInfoCourse] = useState({});
  const [error, setError] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const [isError, setisError] = useState(false);
  const [response, setResponse] = useState("");
  const add = () => {
    axios
      .post("http://localhost:5000/course/", infoCourse, { headers })
      .then((res) => {
        setResponse(res);
        setIsAdd(true);
      })
      .catch((err) => {
        console.log(err);

        setError(err);
        setisError(true);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => {
          setInfoCourse({ ...infoCourse, title: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Description"
        onChange={(e) => {
          setInfoCourse({ ...infoCourse, description: e.target.value });
        }}
      />
      <input
        placeholder="Image"
        onChange={(e) => {
          setInfoCourse({ ...infoCourse, img: e.target.value });
        }}
      />
      <button onClick={add}> add </button>
      {isAdd && <p>{response.data.message}</p>}
      {isError && <p>{error.response.data.message}</p>}
    </div>
  );
};

export default AddCourse;
