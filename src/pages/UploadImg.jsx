import React, { useState, useEffect } from 'react'; 
import '../App.css'; 
import './uploadImg.css'; 
import axios from 'axios'; 
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const UploadImg = () => {
  const [img, setImg] = useState(null);
  const [msg, setMsg] = useState(""); 
  const [uploadImg, setUploadImg] = useState(""); 
  const [images, setImages] = useState([]); 
  console.log(images, "images"); 

  useEffect(() => {
    const getAllImages = async () => {
      try {
        const res = await axios.get("http://localhost:4000/images");
        console.log(res, "res");

        if (res.data) {
          setImages(res.data);
        } else {
          setImages("No images yet");
        }
      } catch (error) {
        console.error(error);
        setMsg("Failed to load images");
      }
    };

    getAllImages();
  }, []);
  


 
  

  const handleImgUpload = (e) => {
    setImg(e.target.files[0]); 
  };

  const handleUpload = async () => {
    if(!img){
      setMsg("Please select an image to upload");
      return; 
    }

    const formData = new FormData(); 

    formData.append("image", img); 

    try{
      const res = await axios.post("http://localhost:4000/upload", formData, {
        headers:{
          "Content-Type": "multipart/form-data",
        },
      }, 
    );

    setUploadImg(res.data.imgUrl); 
    // setMsg("Image uploaded successfully!");
    toast.success("Image uploaded successfully!");
    } catch(error){
      console.error(error);
      // setMsg("Image upload failed.");
      toast.error("Image upload failed.");
    }
  }; 




  return (
    <main>
      <div className="imgUploadCon">
        <h2>Upload Your Images</h2>
        <input type="file" onChange={handleImgUpload} />
        <br />
        <button onClick={handleUpload}>Upload</button>
        <p style={{ color: "green" }}>{msg}</p>
      </div>

      <div>
        {images.map((img, index) => (
          <img
            src={img.imgUrl}
            alt="images"
            style={{ width: "250px", height: "250px", objectFit: "cover" }}
          />
        ))}
      </div>
    </main>
  );
}

export default UploadImg