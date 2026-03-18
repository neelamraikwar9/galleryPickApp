import React, { useState } from 'react'
import './uploadImg.css'; 
import './createAlbum.css'; 


const CreateAlbum = () => {

const [albumName, setAlbumName] = useState("");  
const [description, setDescription] = useState(""); 
const [owner, setOwner] = useState(""); 
const [email, setEmail] = useState(""); 
const [accessLevel, setAccessLevel] = useState("view"); 

//state to hold multiple shared users.
const [sharedUser, setSharedUser] = useState([]); 

//for adding new User in a list; 
const handleAddUser = () => {
  if(!email){
    toast.error("Email is required");
    return;
  }

  setSharedUser([...sharedUser, {email: email.toLowerCase(), accessLevel}]); 

  setEmail(""); 
  setAccessLevel("view"); 
}








  return (
    <div className="outImgUplCon">
      <div className="imgUploadCon">
        <h2>Add Album</h2>
        <form className="imgUploadCon">
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

          <div className="fieldCon">
            <label>Owner: </label>
            <select
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            >
              <option value="">Select Owner</option>
            </select>
          </div>

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
                required
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
            {/* <h4>Shared Users:</h4>
            <ul>
              {sharedUsers.map((user, index) => (
                <li key={index}>
                  {user.email} — {user.accessLevel}
                </li>
              ))}
            </ul> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAlbum