import "./modelFiles.css";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ShareAlbumModal = ({ album, onClose }) => {
  const [email, setEmail] = useState("");
  const [accessLevel, setAccessLevel] = useState("view");
  const [sharedUsers, setSharedUsers] = useState(album.sharedUsers || []);
  const token = localStorage.getItem("token");

  const handleShare = async () => {
    if (!email) return toast.error("Email is required");
    try {
      const res = await axios.patch(
        `https://gallery-pick-apis-lfxz.vercel.app/albums/${album._id}/share`,
        { email, accessLevel },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setSharedUsers(res.data.sharedUsers);
      toast.success(`Shared with ${email}`);
      setEmail("");
    } catch (error) {
      toast.error("Failed to share");
    }
  };

  const handleUnshare = async (emailToRemove) => {
    try {
      const res = await axios.patch(
        `https://gallery-pick-apis-lfxz.vercel.app/albums/${album._id}/unshare`,
        { email: emailToRemove },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setSharedUsers(res.data.sharedUsers);
      toast.success("User removed");
    } catch (error) {
      toast.error("Failed to remove user");
    }
  };

  return (
    <div className="modelContainer">
      <div className="modelFormCont">
        <h3>Share "{album.name}"</h3>

        <input
          type="email"
          placeholder="user@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inputStyl"
        />

        <select
          value={accessLevel}
          onChange={(e) => setAccessLevel(e.target.value)}
          className="selectStyl"
        >
          <option value="view">View</option>
          <option value="edit">Edit</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={handleShare} className="modelBtn">
          Share
        </button>

        {/* Shared users list with remove button */}
        <ul className="ulStyle">
          {sharedUsers.map((u) => (
            <li key={u.email} className="liStyle">
              <span>
                {u.email} — {u.accessLevel}
              </span>
              <button
                onClick={() => handleUnshare(u.email)}
                className="crossBtn"
                style={{}}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <button onClick={onClose} className="closeBtn">
          Close
        </button>
      </div>
    </div>
  );
};

export default ShareAlbumModal;
