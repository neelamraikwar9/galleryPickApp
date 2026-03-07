import React, { useState, useEffect } from 'react'; 
import '../App.css'; 
import './uploadImg.css'; 
import axios from 'axios'; 

const UploadImg = () => {
  const [img, setImg] = useState(null);
  const [msg, setMsg] = useState(""); 
  const [uploadImg, setUploadImg] = useState(""); 

  // useEffect(() => {
  //   const fetch
  // })
  

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
    setMsg("Image uploaded successfully");
    } catch(error){
      console.error(error);
      setMsg("Image upload failed.");
    }
  }; 




  return (
    <div className="">
      
      <div className="imgUploadCon">
        <h2>Upload Your Images</h2>
        <input type="file" onChange={handleImgUpload}/>
        <br/>
        <button onClick={handleUpload}>Upload</button>
        <p>{msg}</p>
      </div>
    </div>
  );
}

export default UploadImg