import '../pages/galleryPick.css'
import { Navigate, Outlet} from "react-router-dom";
import Navbar from "./Navbar";


const ProtectedLayout = () => {
   const isAuthenticated = localStorage.getItem('token'); 

   if(!isAuthenticated){
    return <Navigate to="/signin" replace/>; 
   }
  return (
    <main className="mainContainer">
      <div className="">
        {" "}
        {/* //container navCon */}
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
    </main>
  );
};

export default ProtectedLayout;
