import React from 'react'
import axios from 'axios'
import { UserContext } from '../../../App'
import { useState,useContext,useEffect } from 'react'

const Dashboard = () => {
  const {token} = useContext(UserContext)
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [response, setresponse] = useState("")
  const [error, setError] = useState("")
  const [isError, setIsError] = useState(false)
  const [course, setCourse] = useState()
  const [teacherId, setTeacherId] = useState()
  const getAllCOurse=()=>{
    axios
    .get("http://localhost:5000/course/allCourse",{ headers })
    .then((res)=>{
      console.log(res);
      console.log("gggggg");
      const data =res.data.courses
      console.log( "dddd",data);
      
      
      setCourse(data)
      console.log(course);
      

      setTeacherId(res.data.teacherId)

    })
    .catch((err)=>{
      console.log(err);
      
    })
  
  }
  useEffect(() => {
    getAllCOurse()
  
    
  }, [])
  


  return (
    <div>
      {course?.map((ele,ind)=>{
        return <div>
          <img src={ele.img}/>
          <p>{ele.title}</p>
          <p>{ele.description}</p>
        </div>
        
      })}

    </div>
  )
}

export default Dashboard