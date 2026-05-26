import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";


const AddCommentModel = ({ image, onClose, onUpdate }) => {
  const { token } = useAuth();
  const [commentText, setCommentText] = useState("");

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    try {
      const res = await axios.post(
        `https://gallery-pick-apis-lfxz.vercel.app/images/${image._id}/comments`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success("Comment added!");
      setCommentText("");
      await onUpdate(); // ✅ refetch images in parent
      onClose(); // ✅ close modal
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Failed to add comment");
    }
  };

  return (
    <div className="modelContainer">
      <div className="modelFormCont">
        <h3 style={{ textAlign: "center" }}>Add Comment</h3>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            placeholder="Write your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="inputStyl"
          />
        </div>
        <br />
        <button className="modelBtn" onClick={handleAddComment}>
          Submit
        </button>
        <button className="closeBtn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AddCommentModel;