import React from 'react'
import './albums.css'; 

import axios from 'axios'; 
import { useState, useEffect } from 'react'; 
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Albums = () => {
    const [albms, setAlbms] = useState([]);  
    const [isAlbm, setIsAlbm] = useState(true); 
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

  async function handleDeleteAlbm(e){
    const albmId = e.target.value; 
    console.log(albmId, "albumId"); 
    try{
      await axios.delete(`http://localhost:4000/albums/${albmId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }); 
      setAlbms((prev) => prev.filter((alb) => alb._id !== albmId)); 
      console.log(albms); 

      toast.success("Album delted successfully.", {autoclose:3000}); 
    } catch(error){
      console.log("Failed to delete album", error); 
      toast.error("Failed to delete album. Please try again.", {
        autoClose: 3000, 
      })
    }

  }
  return (
    <>
      <div className="outImgUplCon">
        <h1 className="welTxt">Albums</h1>
        <div className="noImgAlbMsg">
          {albms.length === 0 ? (
            isAlbm && (
              <p className="noImgMsg">
                Not any Album yet navigate to Create Album in the Navbar.
              </p>
            )
          ) : (
            <p></p>
          )}
        </div>
        {albms.map((albm) => (
          <div key={albm._id} className="albumCont">
            <div>
              <p>{albm.name}</p>
              <div className="albImg">
                <i class="bi bi-image" style={{ fontSize: "3rem" }}></i>
                <button value={albm._id} onClick={handleDeleteAlbm}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Albums; 