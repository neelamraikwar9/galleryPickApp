import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import "./uploadImg.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const UploadImg = () => {
  const [msg, setMsg] = useState("");
  const [uploadImg, setUploadImg] = useState("");
  const [albums, setAlbums] = useState([]);
  console.log(albums, "albums");

  const [image, setImage] = useState(null);
  const [album, setAlbum] = useState([]);
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [person, setPerson] = useState("");
  const [comment, setComment] = useState("");

  // const [isloading, setIsLoading] = useState(""); 
  const fileInputRef = useRef(null); 

  console.log(image, album, name, person, comment, "dataaa... ");

  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  useEffect(() => {
    const getAllAlbums = async () => {
      try {
        const res = await axios.get("http://localhost:4000/albums");
        console.log(res, "res");

        if (res.data) {
          setAlbums(res.data);
        } else {
          setAlbums("No albums yet");
        }
      } catch (error) {
        console.error(error);
        setMsg("Failed to load images");
      }
    };

    getAllAlbums();
  }, []);

  const handleImgUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
   
    if (!image && !album && !name && !person && !comment) {
      toast.error("Please fill all the fields.");
      return;
    }

    const formData = new FormData();

    formData.append("image", image);
    formData.append("albumId", album);
    formData.append("name", name);
    formData.append("tags", tags);
    formData.append("person", person);
    formData.append("comments", comment);

    try {
      const response = await axios.post(
        "http://localhost:4000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setUploadedImageUrl(response.data.images);
      toast.success("Image uploaded successfully.");
      fileInputRef.current.value = ""; 
      setImage(null);
      setAlbum("");
      setName("");
      setTags("");
      setPerson("");
      setComment("");
    } catch (error) {
      console.log(error);
      toast.error("Image upload failed.");
    }
  };

  return (
    <div className="outImgUplCon">
      <div className="imgUploadCon">
        <h2>Add Image</h2>
        <form onSubmit={handleUpload} className="formContainer">
          <div className="imgCon fieldCon">
            <label htmlFor="imgUrl">Select Image: </label>
            <input
              type="file"
              ref={fileInputRef}
              id="imgUrl"
              onChange={handleImgUpload}
              // onChange={handleInputChange}
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
              // value={formData.albumId}
              // onChange={handleInputChange}
              onChange={(e) => setAlbum(e.target.value)}
              required
            >
              <option value="">Choose album... </option>
              {albums?.map((albm) => (
                <option key={albm._id} value={albm._id}>
                  {albm.name}
                </option>
              ))}
              {/* apply map and show album name. */}
            </select>
          </div>

          <div className="fieldCon">
            <label>Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              // value={formData.name}
              // onChange={handleInputChange}
              onChange={(e) => setName(e.target.value)}
              placeholder="Vacation Photo"
              required
            />
          </div>

          <div className="fieldCon">
            <label htmlFor="tags">Tags: </label>

            <input
              type="text"
              // name="tags"
              id="tags"
              // value={formData.tags}
              placeholder="beach, sunset, 2025"
              // onChange={handleInputChange}
              onChange={(e) => setTags(e.target.value)}
              required
            />
          </div>

          <div className="fieldCon">
            <label htmlFor="person">Person: </label>
            <input
              type="text"
              // name="person"
              id="person"
              placeholder="River"
              // value={formData.person}
              // onChange={handleInputChange}
              onChange={(e) => setPerson(e.target.value)}
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
              // value={formData.comments}
              // onChange={handleInputChange}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          <br />
          <div className="fieldCon">
            <button type="submit">Upload Image</button>
            {/* <p style={{ color: "green" }}>{msg}</p> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadImg;
