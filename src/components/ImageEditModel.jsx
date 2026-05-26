import "./modelFiles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ImageEditModel = ({ image, onClose, onUpdate }) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [person, setPerson] = useState("");
  const [editData, setEditData] = useState([]);
  //   const [comment, setComment] = useState("");

  useEffect(() => {
    console.log("image object:", image); // ← add this
  }, [image]);

  useEffect(() => {
    if (image) {
      setName(image.name || "");
      setTags(image.tags ? image.tags.join(", ") : "");
      setPerson(image.person || "");
    }
  }, [image]);

  // useEffect(() => {
  const handleUpdateImg = async () => {
    try {
      const res = await axios.put(
        `https://gallery-pick-apis-lfxz.vercel.app/images/${image._id}`,
        {
          name,
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          person,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res, "res");
      setEditData(res.data.image);
      toast.success(`Image updated successfully`);
      setName("");
      setTags("");
      setPerson("");

      await onUpdate();

      onClose();

      // navigate("/galleryPick");
      // setTimeout(() => navigate("/galleryPick"), 1500);
    } catch (error) {
      toast.error("Failed to edit image");
    }
  };
  // })

  return (
    <div className="modelContainer">
      <div className="modelFormCont">
        <h3 style={{ textAlign: "center" }}>Edit Image</h3>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Blue Bird"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="inputStyl"
          />
        </div>

        <div>
          <label htmlFor="tags">Tags:</label>
          <input
            type="text"
            placeholder="Bird, Nature, Animal"
            id="tags"
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="inputStyl"
          />
        </div>

        <div>
          <label htmlFor="person">Person:</label>
          <input
            type="text"
            placeholder="River"
            id="person"
            name="person"
            value={person}
            onChange={(e) => setPerson(e.target.value)}
            className="inputStyl"
          />
        </div>
        <br />

        {/* <div>
            <label htmlFor=""></label>
            <textarea
              type="text"
              placeholder="Our awesome nature with the beautiful animals."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="inputStyl"
            ></textarea>
          </div> */}

        <button className="modelBtn" onClick={handleUpdateImg}>
          Update
        </button>

        <button onClick={onClose} className="closeBtn">
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageEditModel;
