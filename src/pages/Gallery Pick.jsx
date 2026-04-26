import "./galleryPick.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from "../context/AuthContext"; 

const GalleryPick = () => {
  const { user, logout} = useAuth(); 
  console.log(user, "user"); 

  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("");
  const [images, setImages] = useState([]);
  const [msg, setMsg] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isImage, setIsImage] = useState(true); 

  console.log(loggedInUser, "loggedInUser");

  const [favoriteIds, setFavoriteIds] = useState([]); //will store favourite image ids.

  // Check if token exists AND is not expired
  const token = localStorage.getItem("token");
  const isExpired = token
    ? JSON.parse(atob(token.split(".")[1])).exp * 1000 < Date.now()
    : true;

  useEffect(() => {
    if (!token || isExpired) {
      if (isExpired) localStorage.removeItem("token");
      navigate("/signin", { replace: true });
    }
  }, []);

  if (!token || isExpired) return null;

  // ... rest of your code unchanged

  

  const toggleFavorite = async (imageId) => {
    if (!token) {
      toast.error("Please log in first");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:4000/images/favorite",
        {
          imageId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { isFavorite } = res.data;
      console.log(isFavorite, "checkign iffav");

      setFavoriteIds((prev) =>
        isFavorite ? [...prev, imageId] : prev.filter((id) => id !== imageId),
      );
      console.log(favoriteIds, "favoriteIds");

      toast.success(
        isFavorite ? "Added to favorites!" : "Removed from favorites",
      );
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update favorite");
    }
  };

  // useEffect(() => {
  //   setLoggedInUser(localStorage.getItem("loggedInUser"));
  // }, []);

  // const token = localStorage.getItem("token");

  useEffect(() => {
    const getAllImages = async () => {
      try {
        const res = await axios.get("http://localhost:4000/images", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res, "res");

        if (res.data) {
          setImages(res.data);
        } else {
          setImages("No images yet");
        }
      } catch (error) {
        console.error(error);
        setMsg("Failed to load images");
      }
    };

    getAllImages();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:4000/images/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res, "res");
        // Assuming res.data is { favorites: [{ _id: "img1", ... }], count: ... }
        const favIds = res.data.favorites.map((img) => img._id);
        console.log(favIds, "faklvijfdj");
        setFavoriteIds(favIds);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };

    fetchFavorites();
  }, [token]);

  
  async function handleDeleteImgs(e){
    const imgId = e.target.value; 
    console.log(imgId, "imgId"); 

    try{
      await axios.delete(`http://localhost:4000/images/${imgId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      } ); 
      setImages((prev) => prev.filter((img) => img._id !== imgId)); 
      console.log(images, 'dlfkjdkfj'); 

      toast.success("Image deleted successfully.", {autoclose: 3000}); 
    } catch(error){
      console.log("Failed to delete image:", error); 
      toast.error("Failed to delete image. Please try again.",
         {
        autoClose: 3000, 
      }); 
    }
  }




  return (
    <main>
      <div className="container welCon">
        <h1 className="welTxt">
          🌸Welcome to Gallery Pick,
          {user?.name} !🌸
        </h1>
      </div>

      <div>
        <h2 className="welTxt">All Images</h2>
        <div>
          {images.length <= 0 ? (
            isImage && (
              <div style={{color: "pink"}}>
                <p style={{color: "#00FF00"}}>Not images yet!</p>
                  <p>
                  Add images make sure to select an album so create
                  album first then add images to the album.
                </p>
              </div>
            )
          ) : (
            <p></p>
          )}
        </div>
        {images.map((img) => (
          <div key={img._id} className="imgContainer">
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
                style={{
                  fontSize: "20px",
                  cursor: "pointer",
                  position: "absolute",
                  color: favoriteIds.includes(img._id) ? "red" : "white",
                }}
              />
            </button>
            <div className="delBtn">
              <button value={img._id} onClick={handleDeleteImgs}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};;

export default GalleryPick;
