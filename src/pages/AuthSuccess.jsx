import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthSuccess = () => {
     const navigate = useNavigate();

       useEffect(() => {
         // Read the token from the URL query param
         const params = new URLSearchParams(window.location.search);
         const token = params.get("token");
         const error = params.get("error");

         if (error) {
           toast.error("Google sign-in failed. Please try again.");
           navigate("/signin");
           return;
         }

         if (token) {
           // Store in localStorage (or your AuthContext)
           localStorage.setItem("token", token);
           toast.success("Signed in with Google!");
           navigate("/dashboard"); // redirect to your main page
         } else {
           toast.error("No token received.");
           navigate("/signin");
         }
       }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <p>Signing you in...</p>
    </div>
  );
}

export default AuthSuccess