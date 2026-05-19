import React, { useState, useEffect } from "react";
import './albums.css'; 
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 

const SharedAlbums = () => {
  const navigate = useNavigate();
  const [sharedAlbums, setSharedAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(); 

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
              style={{
                border: "1px solid #ccc",
                //   borderRadius: "10px",
                //   padding: "16px",
                width: "250px",
                height: "200px",

                background: "#1e1e2e",
                //   color: "#fff",
              }}
            >
              <div style={{ border: "1px solid green", padding: "1rem" }}>
                <h3 style={{ margin: "0 0 8px" }}>{album.name}</h3>
                <hr />
                <p
                  style={{
                    margin: "0 0 6px",
                    fontSize: "13px",
                    color: "#d8d3d3",
                  }}
                >
                  Description: {album.description || "No description"}
                </p>
                <p style={{ margin: 0, fontSize: "13px", color: "#d8d3d3" }}>
                  Shared by: <strong>{album.ownerId.name}</strong>
                </p>
                <div>
                  {/* Show what access level Beauty has */}
                  {album.sharedUsers
                    .filter((u) => u.email === getUserEmail(token))
                    .map((u) => (
                      <span
                        key={u.email}
                        style={{ fontSize: "13px", color: "#d8d3d3" }}
                      >
                        Status: {u.accessLevel}
                      </span>
                    ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    border: "1px solid green",
                  }}
                >
                  <button
                    onClick={() => navigate(`/sharedAlbums/${album._id}`)}
                    style={{
                      marginTop: "10px",
                      padding: "4px 10px",
                      // background: "#4ade80",
                      border: "none",
                      borderRadius: "5px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    VIEW
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}



export default SharedAlbums;
