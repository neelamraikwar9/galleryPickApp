import "./signup.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
 
  const navigate = useNavigate();
  // const { handleGoogleSignIn } = useAuth();
  console.log(name, email, password, "data");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:4000/signup",
        { name, email, password },
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      // ✅ STORE TOKEN & USER DATA
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      console.log(response, "response");
      toast.success("Account created successful!");
      navigate("/galleryPick");
    } catch (error) {
      console.error("Error:", error.response?.data);

    if (error.response?.status === 401) {
      toast.error("User already exists! Please login instead.");
    } else if (error.response?.status === 400) {
      toast.error("Please check your input data!");
    } else {
      toast.error(error.response?.data?.message || "Signup failed!");
    }
  }
  };

  return (
    <div>
      <div>
        <h1>Gallery Pick</h1>
        <p>
          <i>Sign up to start storing your photos and memories</i>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="lable">
            Name:{" "}
          </label>
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="email" className="lable">
            Email:{" "}
          </label>
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />
        <div>
          <label htmlFor="password" className="lable">
            Password:{" "}
          </label>
          <input
            type="password"
            id="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <div>
        <p>---- Or Sign Up with ----</p>
        {/* <button onClick={handleGoogleSignIn}> */}
        <button
          onClick={() =>
            window.open("http://localhost:4000/auth/google", "_self")
          }
        >
          <img
            src="https://cdn-teams-slug.flaticon.com/google.jpg"
            alt="Google"
            className="googleAuth"
          />
        </button>
        <Link to="/SignIn">
          <p>
            <i>Already have an account? Sign In.</i>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
