import "./galleryPick.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const GalleryPick = () => {
  
  const [loggedInUser, setLoggedInUser] = useState("");
  const [images, setImages] = useState([]);
  const [msg, setMsg] = useState("");

  console.log(loggedInUser, "loggedInUser"); 

  const [favoriteIds, setFavoriteIds] = useState([]); //will store favourite image ids.

  // have to test it if it works..... 
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
    }
  }, []);

  const toggleFavorite = async (imageId) => {
    const token = localStorage.getItem("token");

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

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const token = localStorage.getItem("token");

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

  return (
    <main>
      <div className="container welCon">
       

        <h1 className="welTxt">🌸Welcome to Gallery Pick, {loggedInUser}!🌸</h1>
      </div>

      <div>
        <h2 className="welTxt">All Images</h2>

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
          </div>
        ))}
      </div>
    </main>
  );
};

export default GalleryPick;
