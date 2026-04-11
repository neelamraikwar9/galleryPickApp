import React from 'react'
import { useState, useEffect } from 'react'; 
import axios from 'axios'; 



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
const Favourites = () => {






  const [favImages, setFavImages] = useState([]);
  console.log(favImages, "favjdkfjkdjf");


  const token = localStorage.getItem("token"); 
  console.log(token, "token"); 

  useEffect(() => {
  const getFavImg = async () => {
    if (!token) return; 
    try{
    const res = await axios.get("http://localhost:4000/images/favorites", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res, "res"); 
    const favoriteImgs = res.data.favorites.map((img) => img._id); 
    console.log(favoriteImgs, "favimgs")
    setFavImages(favoriteImgs); 
  } catch(error){
    console.error("Failed to fetch favorites:", error);
  }
  }
  getFavImg();
  } 
  , [])
  
  
  return (
    <>
      <div>
        {favImages.map((img) => (
          <div key={img._id} className="imgContainer">
            <img
              src={img.imgUrl}
              alt="image"
              style={{ width: "250px", height: "250px", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Favourites