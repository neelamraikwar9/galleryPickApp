import React from "react";
import "./albums.css";
import axios from "axios";
import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Albums = () => {
  const navigate = useNavigate();
  const [albms, setAlbms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  // const [sharedAlbums, setSharedAlbums] = useState([]);  

  const token = localStorage.getItem("token");

  //get all albums;
  useEffect(() => {
    const getAlbums = async () => {
      if (!token) return;
      try {
        // const res = await axios.get("http://localhost:4000/albums", {
        const res = await axios.get(
          "https://gallery-pick-apis-lfxz.vercel.app/albums",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(res, "res");
        setAlbms(res.data);
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch albums: ", error);
      }
    };
    getAlbums();
  }, []);

  async function handleDeleteAlbm(e) {
    const albmId = e.target.value;
    console.log(albmId, "albumId");
    try {
      // await axios.delete(`http://localhost:4000/albums/${albmId}`, {
      await axios.delete(
        `https://gallery-pick-apis-lfxz.vercel.app/albums/${albmId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setAlbms((prev) => prev.filter((alb) => alb._id !== albmId));
      console.log(albms);

      toast.success("Album delted successfully.", { autoclose: 3000 });
    } catch (error) {
      console.log("Failed to delete album", error);
      toast.error("Failed to delete album. Please try again.", {
        autoClose: 3000,
      });
    }
  }
  return (
    <main>
      <div>
        <h1 className="welTxt marginBtm">Albums📱</h1>
      </div>
      <div className="noImgAlbMsg noAlMsg">
        {loading ? (
          <p>Albums are Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : albms.length === 0 ? (
          <div className="noImgMsgOnGalPic">
            <p className="noImgMsg">No Album yet.</p>
            <p style={{ color: "pink" }}>
              Navigate to Create Album in the Navbar to create an Album.
            </p>
          </div>
        ) : null}
      </div>
      <div className="albmmOutCont sharedAlCont">
        {albms.map((albm) => (
          <div key={albm._id} className="albmsCon ">
            <div className="albumCont shardAlbOutCont">
              <div className="shardAlbCont">
                <h3 className="albumName">{albm.name}</h3>
                <hr />
                {/* <div className="albImg"> */}

                <p className="pStyle">Description: {albm.description}</p>
                <p className="pStyle">Created by: {albm.ownerId.name}</p>
                <div className="albmBtnsCont">
                  <button
                  className="shareBtn"
                    style={{ backgroundColor: "oklch(74.6% 0.16 232.661)" }}
                  >
                    Share
                    <i
                      class="bi bi-share-fill"
                      style={{ marginLeft: "3px" }}
                    ></i>
                  </button>
                  <button className="viewBtn" onClick={() => navigate(`/albums/${albm._id}`)}>View</button>
                  <button className="deltBtn" value={albm._id} onClick={handleDeleteAlbm}>
                    Delete<i className="bi bi-trash-fill"></i>
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

export default Albums;
