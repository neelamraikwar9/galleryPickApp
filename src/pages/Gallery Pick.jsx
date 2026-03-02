import React from 'react'
import { useAuth } from '../context/AuthContext'; 
import { Navigate } from 'react-router-dom';


const GalleryPick = () => {
  const { user, logout } = useAuth(); 

  if(!user){
    return <Navigate to="/SignIn" />;
  }
  return (
    <div>
    <h1>Welcome to Gallery Pick</h1>
    
    </div>
  )
}

export default GalleryPick; 


