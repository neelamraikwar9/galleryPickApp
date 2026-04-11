import "./galleryPick.css";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const GalleryPick = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("");
  const [images, setImages] = useState([]);
  const [msg, setMsg] = useState("");
  // const navigate = useNavigate();

  const [favoriteIds, setFavoriteIds] = useState([]); //will store favourite image ids.

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
      // console.error(error);
      // toast.error("Failed to update favorite");

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
            // "Authorization": `${token}`
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

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    toast.success("User Loggedout");

    setTimeout(() => {
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    });
  };

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
        <p className="userName">
          <i>Hi {loggedInUser}</i>
        </p>
        <button onClick={handleLogOut}>Log Out</button>

        <h1 className="welTxt">🌸Welcome to Gallery Pick🌸</h1>
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
                  // border: "1px solid red",
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
