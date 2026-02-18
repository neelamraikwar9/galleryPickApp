import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { AuthProvider } from "./context/AuthContext";
import GalleryPick from "./pages/Gallery Pick";
import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <div>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<SignUp />}></Route>
            <Route path="/SignIn" element={<SignIn />}></Route>
            <Route path="/galleryPick" element={<GalleryPick />}></Route>
            <Route path="/uploadImg" element={<GalleryPick />}></Route>
            <Route path="/createAlbum" element={<GalleryPick />}></Route>
          </Routes>
          <ToastContainer />
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
