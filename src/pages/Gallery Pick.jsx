import './galleryPick.css'; 

import React, { useState, useEffect} from 'react' 
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 



const GalleryPick = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [images, setImages] = useState([]); 
  // const navigate = useNavigate(); 

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
        <h1 className="welTxt">Welcome to Gallery Pick</h1>
        <h2 className="welTxt">All Images</h2>
      </div>

      <div>
        {images.map((img) => (
          <img
            src={img.imageUrl}
            alt="image"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        ))}
      </div>
    </main>
  );
}

export default GalleryPick; 


