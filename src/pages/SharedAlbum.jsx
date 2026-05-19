import React, { useState, useEffect } from "react";
import './albums.css'; 
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 

const SharedAlbums = () => {
  const navigate = useNavigate();
  const [sharedAlbums, setSharedAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(sharedAlbums, "sharedAlbums");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSharedAlbums = async () => {
      try {
        const res = await axios.get(
          "https://gallery-pick-apis-lfxz.vercel.app/albums/shared",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        console.log(res.data, "res");
        setSharedAlbums(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load shared albums");
      } finally {
        setLoading(false);
      }
    };

    fetchSharedAlbums();
  }, []);

  // if (loading) return <p>Loading shared albums...</p>;

  // Helper: decode email from JWT token
  const getUserEmail = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.email;
    } catch {
      return "";
    }
  };

  return (
    <main>
      <div>
        <h1 className="welTxt marginBtm">
          {sharedAlbums.length === 1 ? "Album" : "Albums"} Shared With Me📂
        </h1>
      </div>

      <div className="noImgAlbMsg noAlMsg">
        {loading ? (
          <p className="loadingMsg">Loading shared albums...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : sharedAlbums.length === 0 ? (
          <p>No albums have been shared with you yet.</p>
        ) : null}
      </div>

      <div className="albmmOutCont">
        {sharedAlbums.map((album) => (
          <div className="albmsCon">
            <div
              key={album._id}
              className="albumCont"
              // style={{
              //   border: "1px solid #ccc",
              //   borderRadius: "10px",
              //   padding: "16px",
              //   width: "250px",
              //   background: "#1e1e2e",
              //   color: "#fff",
              // }}
            >
              <div>
                <h3 style={{ margin: "0 0 8px" }}>{album.name}</h3>
                <p style={{ margin: "0 0 6px", color: "#aaa" }}>
                  {album.description || "No description"}
                </p>
                <p style={{ margin: 0, fontSize: "13px", color: "#888" }}>
                  Shared by: <strong>{album.ownerId.name}</strong>
                </p>

                <button
                  onClick={() => navigate(`/sharedAlbums/${album._id}`)}
                  // style={{
                  //   marginTop: "10px",
                  //   padding: "6px 16px",
                  //   background: "#4ade80",
                  //   border: "none",
                  //   borderRadius: "20px",
                  //   fontWeight: 600,
                  //   cursor: "pointer",
                  // }}
                >
                  VIEW
                </button>

                {/* Show what access level Beauty has */}
                {album.sharedUsers
                  .filter((u) => u.email === getUserEmail(token))
                  .map((u) => (
                    <span
                      key={u.email}
                      style={{
                        display: "inline-block",
                        marginTop: "8px",
                        padding: "3px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        background:
                          u.accessLevel === "admin"
                            ? "#f87171"
                            : u.accessLevel === "edit"
                              ? "#facc15"
                              : "#4ade80",
                        color: "#000",
                        fontWeight: 600,
                      }}
                    >
                      {u.accessLevel.toUpperCase()}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}



export default SharedAlbums;
