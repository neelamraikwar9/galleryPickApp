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
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#1e1e2e",
          padding: "24px",
          borderRadius: "12px",
          width: "350px",
          color: "#fff",
        }}
      >
        <h3>Share "{album.name}"</h3>

        <input
          type="email"
          placeholder="user@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "8px",
            borderRadius: "8px",
            border: "1px solid #444",
            background: "#2a2a3e",
            color: "#fff",
          }}
        />

        <select
          value={accessLevel}
          onChange={(e) => setAccessLevel(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "8px",
            borderRadius: "8px",
            border: "1px solid #444",
            background: "#2a2a3e",
            color: "#fff",
          }}
        >
          <option value="view">View</option>
          <option value="edit">Edit</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleShare}
          style={{
            width: "100%",
            padding: "9px",
            background: "#6366f1",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Share
        </button>

        {/* Shared users list with remove button */}
        <ul style={{ padding: 0, listStyle: "none", marginTop: "12px" }}>
          {sharedUsers.map((u) => (
            <li
              key={u.email}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "6px",
                marginBottom: "4px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "8px",
              }}
            >
              <span>
                {u.email} — {u.accessLevel}
              </span>
              <button
                onClick={() => handleUnshare(u.email)}
                style={{
                  background: "none",
                  border: "none",
                  color: "red",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "8px",
            background: "transparent",
            border: "1px solid #555",
            borderRadius: "8px",
            color: "#aaa",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShareAlbumModal;
