import React from 'react'
import './albums.css'
import axios from 'axios'; 
import { useState, useEffect } from 'react'; 

const Albums = () => {
    const [albms, setAlbms] = useState([]);  
    console.log(albms, "alnme")

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
      <div class>
        <h1>Albums</h1>
        {albms.map((albm) => (
          <div key={albm._id} className="albumCont">
            <div>
              <p>{albm.name}</p>
              <div className="albImg">
                <i class="bi bi-image" style={{fontSize: "3rem"}}></i>
                 <button>Delete</button>
              </div>
             
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Albums; 