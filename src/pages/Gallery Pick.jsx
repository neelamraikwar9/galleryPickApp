import "./galleryPick.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ImageEditModel from "../components/ImageEditModel"; 

const GalleryPick = () => {
  const { user, logout } = useAuth();
  console.log(user, "user");

  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("");
  const [images, setImages] = useState([]);
  console.log(images, "images");
  const [msg, setMsg] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  // const [selectEdit, setSelectEdit] = useState(null); 

  const [selectedImage, setSelectedImage] = useState(null);

  console.log(loggedInUser, "loggedInUser");

  const [favoriteIds, setFavoriteIds] = useState([]); //will store favourite image ids.

  // Checks if token exists AND is not expired
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

  const toggleFavorite = async (imageId) => {
    if (!token) {
      toast.error("Please log in first");
      return;
    }
    try {
      const res = await axios.post(
        // "http://localhost:4000/images/favorite",
        "https://gallery-pick-apis-lfxz.vercel.app/images/favorite",

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

      setLoading(false);

      toast.success(
        isFavorite ? "Added to favorites!" : "Removed from favorites",
      );
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update favorite");
    }
  };

  useEffect(() => {
    const getAllImages = async () => {
      try {
        // const res = await axios.get("http://localhost:4000/images", {
        const res = await axios.get(
          "https://gallery-pick-apis-lfxz.vercel.app/images",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(res, "res");

        if (res.data) {
          setImages(res.data);
          setLoading(false);
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
        // const res = await axios.get("http://localhost:4000/images/favorites", {
        const res = await axios.get(
          "https://gallery-pick-apis-lfxz.vercel.app/images/favorites",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(res, "res");

        const favIds = res.data.favorites.map((img) => img._id);
        console.log(favIds, "faklvijfdj");
        setFavoriteIds(favIds);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };

    fetchFavorites();
  }, [token]);

  async function handleDeleteImgs(e) {
    const imgId = e.target.value;
    console.log(imgId, "imgId");

    try {
      // await axios.delete(`http://localhost:4000/images/${imgId}`, {
      await axios.delete(
        `https://gallery-pick-apis-lfxz.vercel.app/images/${imgId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setImages((prev) => prev.filter((img) => img._id !== imgId));
      console.log(images, "dlfkjdkfj");

      toast.success("Image deleted successfully.", { autoclose: 3000 });
    } catch (error) {
      console.log("Failed to delete image:", error);
      toast.error("Failed to delete image. Please try again.", {
        autoClose: 3000,
      });
    }
  }

  if (!token || isExpired) return null;

  return (
    <main>
      <div className="container welCon">
        <h1 className="welTxt">
          <span style={{ color: "#6FCF97" }}>🌸Welcome</span>{" "}
          <span style={{ color: "#64d2f7" }}>{user?.name}!🌸</span>
        </h1>
      </div>
      <hr />

      <div>
        <h2 className="welTxt">All Images📸</h2>

        <div>
          {loading ? (
            <p className="loadingMsg">Images are Loading...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : images.length === 0 ? (
            <div className="noImgMsgOnGalPic">
              <p className="noImgMsg">No images yet.</p>
              <p style={{ color: "pink" }}>
                Please create an album first, then add images to it.
              </p>
            </div>
          ) : null}
        </div>

        <div className="allImgesCont allGalImgCon">
          {images.map((img) => (
            <div key={img._id} className="gallImgsCard">
              <img
                src={img.imgUrl}
                alt="image"
                className="allImagesStyl gallImgStyl"
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
                    position: "relative",
                    color: favoriteIds.includes(img._id) ? "red" : "white",
                  }}
                />
              </button>

              <div className="imgsBtn">
                <button
                  className="imgBtn editBtn"
                  onClick={() => setSelectedImage(img)}
                >
                  Edit
                  <i
                    class="bi bi-pencil-fill"
                    style={{
                      // border: "1px solid red",
                      marginLeft: "4px",
                    }}
                  ></i>
                </button>
                <p className="imgName">{img.name}</p>

                <button
                  className="imgBtn delBtn"
                  value={img._id}
                  onClick={handleDeleteImgs}
                >
                  Delete
                  <i
                    className="bi bi-trash3-fill"
                    style={{
                      marginLeft: "2px",
                    }}
                  ></i>
                </button>
              </div>

              <div className="tagCommCont">
                <p>
                  <strong>Tags:</strong> {img.tags.join(", ")}
                </p>
                <div style={{ marign: 0 }}>
                  <strong>Comments:</strong>{" "}
                  {img.comments.length === 0
                    ? "No comments yet"
                    : img.comments.map((c) => (
                        <p key={c._id} style={{ margin: 0 }}>
                          • {c.text}
                        </p>
                      ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <ImageEditModel
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </main>
  );
};

export default GalleryPick;
