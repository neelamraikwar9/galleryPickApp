import "./signup.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useGoogleLogin } from "@react-oauth/google";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();
  // const { handleGoogleSignIn } = useAuth();
  console.log(name, email, password, "data");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("name, email, and password are required.");
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/auth/signup",
        { name, email, password },
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      console.log(response, "response");

      // const { message } = response;

      toast.success("Account created successful!");
      navigate("/signin");

      setName("");
      setEmail("");
      setPassword("");
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

  function handleEyeClick() {
    setVisible(!visible);
  }

  return (
    <div className="logSignContainer container">
      <div className="signUpInContainer">
        <div>
          <h1 className="logoTxt">Gallery Pick</h1>
          <p className="phrase">
            <i>Sign up to start storing your photos and memories</i>
          </p>
        </div>
        <div className="formStyle">
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
                className="fieldGap"
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
                className="fieldGap"
              />
            </div>

            <br />
            <div>
              <label htmlFor="password" className="label">
                Password:{" "}
              </label>
              <input
                type={visible ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="fieldGap"
                placeholder="Your Password"
              />

              <button
                type="button"
                onClick={handleEyeClick}
                className="eyeBtn"
                // style={{marginRight: "5rem"}}
              >
                {visible ? (
                  <i className="bi bi-eye"></i>
                ) : (
                  <i class="bi bi-eye-slash"></i>
                )}
              </button>
            </div>
            <br />
            <button className="signInBtn" type="submit">
              Sign Up
            </button>
          </form>
          <div>
            <p>---- Or Sign Up with ----</p>
            {/* <button onClick={handleGoogleSignIn}> */}
            <button
              className="btn"
              type="button"
              onClick={() =>
                (window.location.href = "http://localhost:4000/auth/google")
              }
            >
              <img
                src="https://cdn-teams-slug.flaticon.com/google.jpg"
                alt="Google"
                className="googleImg"
              />
              {/* Sign up with Google */}
            </button>
            <Link to="/signin">
              <p>
                <i>Already have an account? Sign In.</i>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
