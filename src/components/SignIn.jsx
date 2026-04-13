import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./signIn.css"; 
// import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { login, handleGoogleSignIn } = useAuth();
  const navigate = useNavigate();
  console.log(email, password, "Data");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4000/auth/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      console.log(res, "res");
      toast.success(res.data?.message);

      const { message, jwtToken, name } = res.data;
      localStorage.setItem("token", jwtToken);
      localStorage.setItem("loggedInUser", name);

      navigate("/galleryPick");
    } catch (error) {
      console.error("Login error: ", error);
      if (error.response?.status === 401) {
        toast.error("Invalid credentials.");
      } else {
        toast.error(error.response?.data?.message || "Login failed!");
      }
    }
  };

  return (
    <div className="logSignContainer container">
      <div className="signUpInContainer">
        <div>
          <h1 className="logoTxt">Gallery Pick</h1>
          <p className="phrase">
            <i>Sign in to access your photos and memories</i>
          </p>
        </div>
        <div className="formStyle">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="label">
                Email:{" "}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="fieldGap"
                placeholder="river96@gmail.com"
              />
            </div>
            <br />
            <div>
              <label htmlFor="password" className="label">
                Password:{" "}
              </label>
              <input
                type="text"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="fieldGap"
              />
            </div>
            <br />
            <button className="signInBtn" type="submit">Sign In</button>
          </form>
          <div>
            <p>---- Or Sign In with ----</p>
            <button
              onClick={() => window.open("http://localhost:4000/auth/google")}
              className="btn"
            >
              <img
                src="https://cdn-teams-slug.flaticon.com/google.jpg"
                alt="Google"
                className="googleImg"
              />
            </button>
            <Link to="/signup">
              <p>
                <i>Don't have an account? Create a new Account!</i>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
