import "./authSuccess.css"; 
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth(); 

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      toast.error("Google sign-in failed.", { toastId: "google-error" });
      navigate("/signin");
      return;
    }

    const fetchUser = async () => {
      try {
        localStorage.setItem("token", token);

        // const response = await axios.get("http://localhost:4000/auth/me", {
        const response = await axios.get(
          "https://gallery-pick-apis-lfxz.vercel.app/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          },
        );

        setUser(response.data.user);

        toast.success("Signed in with Google!", { toastId: "google-success" });
        navigate("/galleryPick");
      } catch (error) {
        console.error("Failed to fetch user:", error);
        toast.error("Something went wrong. Please try again.");
        navigate("/signin");
      }
    };

    fetchUser();
  }, [navigate, setUser]);

  return (
    <div className="ImgCon">
      <img
        src="/favicon.ico"
        alt="logo"
        style={{ width: "200px", height: "200px" }}
      />
      <div className="spinner">
        <h2>📸Signing you in...</h2>
        <p>Please wait a moment</p>
      </div>
    </div>
  );
};

export default AuthSuccess;
