import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SharedAlbumImages = () => {
  const { albumId } = useParams(); // ✅ gets the albumId from URL
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading)
    return <p style={{ color: "#fff", padding: "20px" }}>Loading images...</p>;

  return (
    <main
      style={{ padding: "20px", background: "#0f0f1a", minHeight: "100vh" }}
    >
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

      <h2 style={{ color: "#fff" }}>📷 Album Images</h2>

      {images.length === 0 ? (
        <p style={{ color: "#aaa" }}>No images in this album.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "12px",
          }}
        >
          {images.map((img) => (
            <img
              key={img._id}
              src={img.url || img.imageUrl || img.path}
              alt="album img"
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default SharedAlbumImages;
