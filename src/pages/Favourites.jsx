import React from "react";
import "./favourites.css";
// import './galleryPick.css';
import './galleryPick.css'
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Favourites = () => {
  const [favImages, setFavImages] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favImgMsg, setFavImgMsg] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  console.log(favImages, "favjdkfjkdjf");

  const token = localStorage.getItem("token");
  console.log(token, "token");

  useEffect(() => {
    const getFavImg = async () => {
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
        const favoriteImgs = res.data.favorites;
        console.log(favoriteImgs, "favimgs");
        setFavImages(favoriteImgs);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };
    getFavImg();
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

      toast.success(
        isFavorite ? "Added to favorites!" : "Removed from favorites",
      );
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update favorite");
    }
  };

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
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };

    fetchFavorites();
  }, [token]);

  return (
    <main>
      <div style={{border: "1px solid blue"}}>
        <h1 className="welTxt">Favorite Images</h1>
      </div>
      <div className="noImgAlbMsg">
        {loading ? (
          <p>Favorites Images are Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : favImages.length === 0 ? (
          <p className="noImgMsg">There are no favorite Images.</p>
        ) : null}
      </div>

      <div className="favImgContainer">
        {favImages.map((img) => (
          <div key={img._id} className="imgContainer favImgHeight">
            <img src={img.imgUrl} alt="image" className="favImgStyl" />
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

export default Favourites;
