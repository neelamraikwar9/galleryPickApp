// src/pages/AuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; 

const AuthSuccess = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth(); // getting setUser from context

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      toast.error("Google sign-in failed.");
      navigate("/signin");
      return;
    }

    const fetchUser = async () => {
      try {
        // 1. Save token
        localStorage.setItem("token", token);

        // 2. Fetch full user data using that token
        const response = await axios.get("http://localhost:4000/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ send token immediately
          },
        });

        // 3. Save user to context so it's available everywhere
        setUser(response.data.user); // ✅ now username shows in navbar etc.

        toast.success("Signed in with Google!");
        navigate("/galleryPick"); // ✅ change to your actual route
      } catch (error) {
        console.error("Failed to fetch user:", error);
        toast.error("Something went wrong. Please try again.");
        navigate("/signin");
      }
    };

    fetchUser();
  }, [navigate, setUser]);

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <p>Signing you in...</p>
    </div>
  );
};

export default AuthSuccess;
