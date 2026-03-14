import React, { useState, useEffect } from "react";
import "../App.css";
import "./uploadImg.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const UploadImg = () => {
  // const [msg, setMsg] = useState("");
  const [uploadImg, setUploadImg] = useState("");

  const [formData, setFormData] = useState({
    imgUrl: null, //
    albumId: "", //
    name: "", //
    tags: "", //
    person: "",
    comments: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "imgUrl") {
      setFormData({ ...formData, imgUrl: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // const handleImgUpload = (e) => {
  //   setImage(e.target.files[0]);
  // };

  const handleUpload = async () => {
    //validating required fields;
    if (!formData.imgUrl || !formData.albumId || !formData.name) {
      // setMsg("Please select an image to upload");
      toast.error("Please fill image, album, and name fields!");
      return;
    }

    const imgFormData = new FormData();

    imgFormData.append("image", formData.imgUrl);
    imgFormData.append("albumId", formData.albumId);
    imgFormData.append("name", formData.name);
    imgFormData.append("tags", formData.tags);
    imgFormData.append("person", formData.person);
    imgFormData.append("comments", formData.comments);

    try {
      const res = await axios.post(
        "http://localhost:4000/upload",
        imgFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setUploadImg(res.data.imgUrl);
      // setMsg("Image uploaded successfully!");
      toast.success("Image uploaded successfully!");

      setFormData({
        imgUrl: null,
        albumId: "",
        name: "",
        tags: "",
        person: "",
        comments: "",
      });
    } catch (error) {
      console.error("upload error", error);
      // setMsg("Image upload failed.");
      toast.error(
        "Upload failed: " + (error.response?.data?.message || error.message),
      );
    }
  };

  return (
    <div className="outImgUplCon">
      <div className="imgUploadCon">
        <h2>Add Image</h2>
        <form className="formContainer">
          <div className="imgCon fieldCon">
            <label htmlFor="imgUrl">Select Image: </label>
            <input
              type="file"
              name="imgUrl"
              id="imgUrl"
              // onChange={handleImgUpload}
              onChange={handleInputChange}
              required
              className="imgInp"
            />
          </div>

          {/* //fetch album with apis */}
          <div className="fieldCon">
            <label htmlFor="album">Select Album: </label>
            <select
              name="albumId"
              id="album"
              value={formData.albumId}
              onChange={handleInputChange}
              required
            >
              <option value="">Choose album... </option>
              {/* apply map and show album name. */}
            </select>
          </div>

          <div className="fieldCon">
            <label>Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Vacation Photo"
              required
            />
          </div>

          <div className="fieldCon">
            <label htmlFor="tags">Tags: </label>

            <input
              type="text"
              name="tags"
              id="tags"
              value={formData.tags}
              placeholder="beach, sunset, 2025"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="fieldCon">
            <label htmlFor="person">Person: </label>
            <input
              type="text"
              name="person"
              id="person"
              placeholder="River"
              value={formData.person}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="fieldCon">
            <label htmlFor="comments">Comment: </label>
            <input
              type="text"
              name="comments"
              id="comments"
              placeholder="Write your comment"
              value={formData.comments}
              onChange={handleInputChange}
              required
            />
          </div>

          <br />
          <div className="fieldCon">
            <button onClick={handleUpload}>Upload Image</button>
            {/* <p style={{ color: "green" }}>{msg}</p> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadImg;
