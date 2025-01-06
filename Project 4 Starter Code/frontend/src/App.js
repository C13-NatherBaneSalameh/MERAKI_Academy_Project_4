import React from "react";
import "./App.css";
import Register from "./components/shared components/Register/Register";
import { useState, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/shared components/Login/Login";
import Navbar from "./components/shared components/Navbar";
import Dashboard from "./components/shared components/Dashboard/Dashboard";
import Logout from "./components/Logout/logout";
import AddCourse from "./components/shared components/AddCourse/addCourse";
import DashboardLseeons from "./components/shared components/DashboardLessons/DashboardLseeons";
import Addlesson from "./components/shared components/AddLesson/Addlesson";
import NotFoundPage from "./components/shared components/NotFoundPage";
import Test from "./components/shared components/Test";
export const UserContext = createContext();
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [courseId, setCourseId] = useState("");
  const [course, setCourse] = useState();
  const [lesson, setLesson] = useState([]);
  const [centredModal, setCentredModal] = useState(false);
  const [lessAdd, setLessAdd] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem("userName"))
  const [centredModall, setCentredModall] = useState(false);

  return (
    <UserContext.Provider
      value={{
        token,
        course,
        setCourse,
        setToken,
        courseId,
        setCourseId,
        lesson,
        setLesson,
        role,
        setRole,
        setCentredModal,
        centredModal,
        lessAdd,
        setLessAdd,
        userName,
setUserName,
centredModall,
setCentredModall
      }}
    >
      <div className="App">
        <Navbar />
        {/* <Test/> */}
        <Routes>
          {/* <Route path="/test" element={<Test />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/addNewCourse" element={<AddCourse />} />
          <Route path="/dashboard/:id" element={<DashboardLseeons />} />
          <Route path="/addLesson/:id" element={<Addlesson />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

export default App;
