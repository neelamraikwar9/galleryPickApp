import Navbar from "./Navbar";
import { Outlet } from 'react-router-dom'; 

import React from 'react'

const ProtectedLayout = () => {
  return (
    <main>
    <div>
      <Navbar/>
    </div>
    <div>
      <Outlet/>
    </div>
    </main>
  )
}

export default ProtectedLayout; 
