import './modelFiles.css'; 
import React, { useState } from "react"; 
import axios from 'axios'; 
import { toast } from "react-toastify"; 

const ImageEditModel = ({ onClose }) => {
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [person, setPerson] = useState("");
  const [comment, setComment] = useState("");

  return (
    <div className="modelContainer">
      <div className="modelFormCont">
        <h3 style={{ textAlign: "center" }}>Edit Image</h3>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Blue Bird"
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
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="inputStyl"
          />
        </div>

        <div>
          <label htmlFor="">Person:</label>
          <input
            type="text"
            placeholder="River"
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

        <button className="modelBtn">Update</button>

        <button onClick={onClose} className="closeBtn">
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageEditModel; 