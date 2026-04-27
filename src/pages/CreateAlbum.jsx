import React, { useState, useEffect } from 'react'
import './uploadImg.css'; 
import './createAlbum.css'; 
import axios from 'axios'; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CreateAlbum = () => {

const [msg, setMsg] = useState(""); 
const [users, setUsers] = useState([]); 
console.log(users, "users")
const [albumName, setAlbumName] = useState("");  
const [description, setDescription] = useState(""); 
const [owner, setOwner] = useState(""); 
const [email, setEmail] = useState(""); 
const [accessLevel, setAccessLevel] = useState("view");


//state to hold multiple shared users.
const [sharedUsers, setSharedUsers] = useState([]); 

//for adding new User in a list; 
const handleAddUser = () => {
  if(!email){
    toast.error("Email is required");
    return;
  }

  setSharedUsers([...sharedUsers, {email: email.toLowerCase(), accessLevel}]); 

  setEmail(""); 
  setAccessLevel("view"); 
}


useEffect(() => {
  const getAllUsers = async () => {
    try{
      const res = await axios.get("http://localhost:4000/users"); 
      console.log(res, "res"); 

      if(res.data){
        setUsers(res.data); 
      } else{
        setUsers("No users yet"); 
      }
    } catch(error){
      console.error(error); 
      setMsg("Failed to load users");
    }
  }
  getAllUsers();
}, [])

const token = localStorage.getItem("token"); 
console.log(token, "token"); 

  const handleAlbumSbmt = async (e) => {
    e.preventDefault();

    if (!albumName) {
      toast.error("Album name is required");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/albums",
        {
          name: albumName,
          description,
          owner,
          sharedUsers,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log(response, "response");
      toast.success("Album created successfully.");
      setAlbumName(""); 
     setDescription("");
     setOwner("");
    //  setSharedUsers([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create album."); 
    }
  };

 




  return (
    <main className="outImgUplCon" 
    // style={{width: "0%"}}
    >
      <div className="albumOutCon">
        <div className="imgUploadCon">
          <h2 className="addAlbmTxt">Add Album</h2>
          {/* <div className="albmContainer"> */}
          <form onSubmit={handleAlbumSbmt} className="formContainer">
            <div className="fieldCon">
              <label htmlFor="name">Album Name: </label>
              <input
                type="text"
                id="name"
                value={albumName}
                placeholder="Enter Album Name"
                onChange={(e) => setAlbumName(e.target.value)}
              />
            </div>

            <div className="fieldCon">
              <label htmlFor="des">Description: </label>
              <input
                type="text"
                id="des"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* <div className="fieldCon">
            <label>Owner: </label>
            <select
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            >
              <option value="">Select Owner</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>{user.name}</option>
              ))}
            </select>
          </div> */}

            <div className="addSharedCon">
              <h3 style={{ margin: 0 }}>Add Shared User</h3>
              <div className="fieldCon">
                <label htmlFor="email">Email: </label>
                <input
                  type="email"
                  id="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // required
                />
              </div>

              <div className="fieldCon accCon">
                <label htmlFor="access">Access Level: </label>
                <select
                  id="access"
                  value={accessLevel}
                  onChange={(e) => setAccessLevel(e.target.value)}
                >
                  <option value="view">View</option>
                  <option value="edit">Edit</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="userBtnCon">
                <button
                  className="addUserBtn"
                  type="button"
                  onClick={handleAddUser}
                >
                  Add User
                </button>
              </div>

              {/* Show current list */}
              <h4>Shared Users:</h4>
              <ul>
                {sharedUsers.map((user, index) => (
                  <li key={index}>
                    {user.email} — {user.accessLevel}
                  </li>
                ))}
              </ul>
            </div>
            <div className="addAlbBtn">
              <button type="submit">Add Album</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default CreateAlbum