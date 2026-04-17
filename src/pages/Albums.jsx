import React from 'react'
import axios from 'axios'; 
import { useState, useEffect } from 'react'; 

const Albums = () => {
    const [albms, setAlbms] = useState([]);  

    const token = localStorage.getItem("token"); 

 //get all albums; 
  useEffect(() => {
    const getAlbums = async () => {
      if(!token) return; 
      try{
      const res = await axios.get("http://localhost:4000/albums", {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      });
      console.log(res, "res"); 
      setAlbms(res.data); 
    } catch(error){
      console.log("Failed to fetch albums: ", error); 
    }
    }; 
    getAlbums(); 
  }, []); 
  return (
    <main>
     <div>
        <h1>Albums</h1>
     </div>
    </main>
  )
}

export default Albums; 