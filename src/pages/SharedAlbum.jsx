import React, { useState, useEffect } from "react";
import "./albums.css";
import "./sharedAlbm.css";
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
    <main className="sharedAlbmCont">
      <div>
        <h2 className="shAlHdTxt">
          {sharedAlbums.length === 1 ? "Album" : "Albums"} Shared With Me📂
        </h2>
      </div>

      <div className="noImgAlbMsg noAlMsg">
        {loading ? (
          <p className="loadingMsg marginR">Loading shared albums...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : sharedAlbums.length === 0 ? (
          <p>No albums have been shared with you yet.</p>
        ) : null}
      </div>

      <div className="albmmOutCont sharedAlCont">
        {sharedAlbums.map((album) => (
          <div className="albmsCon">
            <div key={album._id} className="albumCont shardAlbOutCont">
              <div className="shardAlbCont">
                <h3 className="albumName">{album.name}</h3>
                <hr />

                <p className="pStyle">
                  Description: {album.description || "No description"}
                </p>
                <p className="pStyle">
                  Shared by: <strong>{album.ownerId.name}</strong>
                </p>
                <div>
                  {/* Show what access level Beauty has */}
                  {album.sharedUsers
                    .filter((u) => u.email === getUserEmail(token))
                    .map((u) => (
                      <span
                        key={u.email}
                        className="pStyle"
                      >
                        Status: {u.accessLevel}
                      </span>
                    ))}
                </div>
                <div
                  className="vBtnCont"
                >
                  <button
                    onClick={() => navigate(`/sharedAlbums/${album._id}`)}
                    className="vBtnStyl"
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
};

export default SharedAlbums;
