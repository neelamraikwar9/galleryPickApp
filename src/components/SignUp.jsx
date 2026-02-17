import './signup.css'
import axios from "axios";
import { useState } from "react";
import { Link } from 'react-router-dom'; 



const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(name, email, password, "data"); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const response = await axios.post("http://localhost:4000/signup", {name, email, password}, {
      headers: {
        "Content-Type": "application/json"}, 
    }); 

    console.log(response, "response")
  }


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
          />
        </div>
        <br />
        <div>
          <button type="submit">Sign Up</button>
          <p>---- Or Sign Up with ----</p>
           <img src="https://cdn-teams-slug.flaticon.com/google.jpg" alt="Google" className="googleAuth" onClick/>
          <Link to="/SignIn"><p><i>Already have an account? Sign In.</i></p></Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
