import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, handleGoogleSignIn } = useAuth();
  const navigate = useNavigate();
  console.log(email, password, "Data");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log(response, "response");

      // ✅ STORE TOKEN & USER DATA
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      const data = await response.data;
      console.log(data, "data");

      if (data.token) {
        login(data.token);
        navigate("/galleryPick");
        toast.success("You are logged in successfully.");
      } else {
        toast.error("Invalid Email and Password.");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data);
      if (error.response?.status === 401) {
        toast.error("Invalid credentials.");
      } else {
        toast.error(error.response?.data?.message || "Login failed!");
      }
    }
  };

  return (
    <div>
      <div>
        <h1>Gallery Pick</h1>
        <p>
          <i>Sign in to access your photos and memories</i>
        </p>
      </div>

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
          />
        </div>
        <br />
        <button type="submit">Sign In</button>
      </form>
      <div>
        <p>---- Or Sign In with ----</p>
        <button
          onClick={() => window.open("http://localhost:4000/auth/google")}
        >
          <img
            src="https://cdn-teams-slug.flaticon.com/google.jpg"
            alt="Google"
            className="googleAuth"
          />
        </button>
        <Link to="/">
          <p>
            <i>Don't have an account? Create a new Account!</i>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
