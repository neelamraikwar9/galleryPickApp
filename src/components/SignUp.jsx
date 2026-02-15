import React from "react";
import { useState } from 'react'; 


const SignUp = () => {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  return (
    <div>
      <div>
        <h1>Gallery Pick</h1>
        <p>
          <i>Sign up to start storing your photos and memories</i>
        </p>
      </div>
      <div>

        <label>Name: </label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
        <br/>
        <label>Email: </label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <br/>
        <label>Password: </label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <br/>
      </div>
    </div>
  );
};

export default SignUp;
