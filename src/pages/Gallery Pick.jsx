import './galleryPick.css'; 

import React, { useState, useEffect} from 'react' 
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";



const GalleryPick = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [images, setImages] = useState([]); 
  // const navigate = useNavigate(); 

  const [favoriteIds, setFavoriteIds] = useState([]);  //will store favourite image ids. 

  const toggleFavorite = async (imageId) => {
    try{
    const res = await axios.post(
      "http://localhost:4000/favorites/toggle",
      {
        imageId,
      },
      {
        headers: {
          Authorization: localStorage.getItem("loggedInUser"),
        },
      },
    );

    const { isFavorite } = res.data; 

    setFavoriteIds((prev) => isFavorite ? [...prev, imageId] : prev.filter((id) => id !== imageId)); 
    }catch(error){
      console.error(error); 
      toast.error("Failed to update favorite");
    }
  }; 

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser")); 
  }, []); 

useEffect(() => {
  const getAllImages = async () => {
  try{
  const res = await axios.get("http://localhost:4000/images");
  console.log(res, "res"); 

  if(res.data){
    setImages(res.data); 
  } else{
    setImages("No images yet");
  }

  } catch(error){
    console.error(error); 
    setMsg("Failed to load images");
}
}; 

getAllImages(); 

}, [])
  


 
  return (
    <main>
      <div className="container welCon">
        <p className="userName">
          <i>Hi {loggedInUser}</i>
        </p>
        <h1 className="welTxt">🌸Welcome to Gallery Pick🌸</h1>
      </div>

      <div>
        <h2>
          {" "}
          <h2 className="welTxt">All Images</h2>
        </h2>
        {images.map((img) => (
          <div>
            <img
              src={img.imgUrl}
              alt="image"
              style={{ width: "250px", height: "250px", objectFit: "cover" }}
            />
            <button
              className="heartBtn"
              onClick={() => toggleFavorite(img._id)}
            >
              <i
                className={
                  favoriteIds.includes(img._id)
                    ? "bi bi-heart-fill text-danger"
                    : "bi bi-heart"
                }
                style={{ fontSize: "20px", cursor: "pointer" }}
              />
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default GalleryPick; 


