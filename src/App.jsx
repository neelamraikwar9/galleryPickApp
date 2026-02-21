import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { AuthProvider } from "./context/AuthContext";
import GalleryPick from "./pages/Gallery Pick";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLayout from "./components/ProtectedLayout";
import UploadImg from "./pages/UploadImg";
import CreateAlbum from "./pages/CreateAlbum";
import PageNoteFound from "./pages/PageNoteFound";

function App() {
  return (
    <>
      <div>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<SignUp />}></Route>
            <Route path="/SignIn" element={<SignIn />}></Route>
            {/* <Route path="/" element={<Navigate to="/SignIn"/>}/> */}
            <Route element={<ProtectedRoute />}>
              <Route element={<ProtectedLayout />}>
                <Route path="/galleryPick" element={<GalleryPick />}></Route>
                <Route path="/uploadImg" element={<UploadImg />}></Route>
                <Route path="/createAlbum" element={<CreateAlbum />}></Route>
                <Route path="*" element={<PageNoteFound />}></Route>
              </Route>
            </Route>
          </Routes>
          <ToastContainer />
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
