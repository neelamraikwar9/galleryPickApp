import React, { useState, useEffect} from 'react' 
import { useNavigate } from 'react-router-dom';


const GalleryPick = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  // const [] 
  const navigate = useNavigate(); 

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser")); 
  }, []); 


 
  return (
    <div>
      <h2>Hi {loggedInUser}</h2>
      <h1>Welcome to Gallery Pick</h1>
    </div>
  );
}

export default GalleryPick; 


