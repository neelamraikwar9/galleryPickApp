import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    const data = await response.json(); 
    console.log(data, "data"); 

    if(data.token){
      login(data.token); 
      navigate("/landingPage");
      toast.success("You are logged in successfully."); 
    } else{
      toast.error("Invalid Email and Password."); 
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
          />
        </div>
        <br />
        <div>
          <button type="submit">Sign In</button>
          <p>---- Or Sign In with ----</p>
          <img
            src="https://cdn-teams-slug.flaticon.com/google.jpg"
            alt="Google"
            className="googleAuth"
            onClick
          />
          <Link to="/">
            <p>
              <i>Don't have an account? Create a new Account!</i>
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
