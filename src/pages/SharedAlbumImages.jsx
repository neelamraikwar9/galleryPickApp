import './sharedAlbmImgs.css'; 
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SharedAlbumImages = () => {
  const { albumId } = useParams(); // ✅ gets the albumId from URL
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(); 
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(
          `https://gallery-pick-apis-lfxz.vercel.app/images/${albumId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        console.log(res.data, "images response"); // check this in console
        setImages(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load images");
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [albumId]);

   

  return (
    <main>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "16px",
          padding: "8px 16px",
          background: "transparent",
          border: "1px solid #555",
          borderRadius: "8px",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      <div>
        <h1 className="welTxt  shAlHdTxt">Album Images📷</h1>
      </div>

      <div className="noImgAlbMsg favImgMsg">
        {loading ? (
          <p>Loading album images...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : images.length === 0 ? (
          <p className="noImgMsg">No images in this album.</p>
        ) : null}
      </div>

      <div className="albmmOutCont">
        <div className="favImgContainer">
          {images.map((img) => (
            <div key={img._id} className="imgContainer">
              <img
                src={img.imgUrl}
                alt={img.name}
                className= "sharedImgs"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default SharedAlbumImages;
