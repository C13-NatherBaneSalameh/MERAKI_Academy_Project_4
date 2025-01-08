import React from 'react'
import axios from 'axios'
import { UserContext } from '../../../App'
import { useContext,useState,useEffect } from 'react'
import "./style.css"
export const Favorite = () => {
    const{token,role}=useContext(UserContext)
    const headers = {
        Authorization: `Bearer ${token}`,
      };
const [favoritItem, setFavoritItem] = useState()
const 
  return (
    <div>Favorite</div>
  )
}
