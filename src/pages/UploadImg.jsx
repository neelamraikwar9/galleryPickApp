import React, { useState } from 'react'; 
import axios from 'axios'; 

const UploadImg = () => {
  const [img, setImg] = useState(null);
  const [msg, setMsg] = useState(""); 
  const [uploadImg, setUploadImg] = useState(""); 
  

  const handleImgUpload = () => {};

  const handleUpload = () => {}; 

  return (
    <div className="mainContainer">
      
      <div>
        <h2>Upload Your Images</h2>
        <input type="file" onChange={handleImgUpload}/>
        <br/>
        <button onClick={handleUpload}>Upload</button>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default UploadImg