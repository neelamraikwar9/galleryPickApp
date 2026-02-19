import "./signup.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { handleGoogleSignIn } = useAuth();
  console.log(name, email, password, "data");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:4000/signup",
      { name, email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    console.log(response, "response");

    if (response.status === 201) {
      navigate("/galleryPick");
      toast.success("Account created successfully!");
    } else {
      setError(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Network error",
      );
      toast.error(errorMsg);
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
        <button onClick={handleGoogleSignIn}>
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
