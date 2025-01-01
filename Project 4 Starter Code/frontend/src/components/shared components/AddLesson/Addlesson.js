import React from 'react'
import { useParams } from 'react-router-dom'
import { useState,useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../../../App'
const Addlesson = () => {
    const {token}=useContext(UserContext)
    const headers = { Authorization: `Bearer ${token}` };

    const [lessonInfo, setLessonInfo] = useState({})
    const [error, setError] = useState("")
    const [response, setResponse] = useState("")
    const [isAdded, setIsAdded] = useState(false)
    const [isError, setIsError] = useState(false)
    const {id}=useParams()
    console.log(id);

    const addNewLesson=()=>{
        setLessonInfo({...lessonInfo,courseId:id})



            console.log(id);

            

        axios
        .post("http://localhost:5000/lessons" , lessonInfo, { headers })
        .then((res)=>{
            console.log("res lesson",res);
            
            setResponse(res)
            console.log(response);
            
            setIsAdded(true)
            setIsError(false)

        })
        .catch((err)=>{
            setError(err)
            setIsError(true)
            setIsAdded(false)
        })
    }

    
  return (
    <div>
        <input type='text' placeholder='title' onChange={(e)=>{
            setLessonInfo({...lessonInfo,title:e.target.value })
        }}/>
        
        <textarea type ='text' placeholder='Description' onChange={(e)=>{
            setLessonInfo({...lessonInfo,description:e.target.value })
        }} ></textarea>
        <input placeholder='Video' onChange={(e)=>{
            setLessonInfo({...lessonInfo,video:e.target.value })
        }}/>
        <button onClick={addNewLesson} > AddLesson</button>
        {isError&&<p>{error.response.data.message}</p>}
        {isAdded&&<p>{response.data.message}</p>}
    </div>
  )
}

export default Addlesson