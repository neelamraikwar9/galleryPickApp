import './galleryPick.css'; 

import React, { useState, useEffect} from 'react' 
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'


const GalleryPick = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  // const [] 
  // const navigate = useNavigate(); 

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser")); 
  }, []); 


 
  return (
    <main>
      <div className="container welCon">
        <p className="userName">
          <i>Hi {loggedInUser}</i>
        </p>
        <h1 className="welTxt">Welcome to Gallery Pick</h1>
      </div>
    </main>
  );
}

export default GalleryPick; 


