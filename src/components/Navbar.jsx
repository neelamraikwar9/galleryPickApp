import "./navbar.css";
import '../pages/galleryPick.css'; 
import { NavLink } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  console.log(user, "user");
  const [isOpen, setIsOpen] = useState(false); 

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    toast.success("User Loggedout");

    setTimeout(() => {
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    });
  };

  return (
    <main>
      <div>
        <nav className="navContainer">
          {/* <div className="logoCon"> */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src="/logo.png"
              alt="Gallery Pick logo"
              className="logo"
              style={{
                width: 70,
                height: 70,
                // border: "1px solid green",
                marginTop: "5px",
              }}
              onClick={() => navigate("./galleryPick")}
            />
          </div>
          <h1
            className="logTxt"
            onClick={() => navigate("./galleryPick")}
            style={{
              cursor: "pointer",
              marginTop: "1px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            GalleryPick
          </h1>
          {/* </div> */}

          {/* //hamburger button;  */}
          <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          {/* Nav Items */}

          <ul className={`navItems ${isOpen ? "open" : ""}`}>
            <li className="navItem">
              <NavLink
                to="/galleryPick"
                className="navItemtxt"
                onClick={() => setIsOpen(false)}
              >
                <div>
                  <i
                    class="bi bi-house-door-fill"
                    style={{ border: "1px solid green", padding: "0px 10px" }}
                  ></i>
                  Home
                </div>
              </NavLink>
            </li>
            <li className="navItem">
              <NavLink
                to="/uploadImg"
                className="navItemtxt"
                onClick={() => setIsOpen(false)}
              >
                <div>
                  <i
                    class="bi bi-images"
                    style={{ border: "1px solid green", padding: "0px 10px" }}
                  ></i>
                  Add Images
                </div>
              </NavLink>
            </li>

            <li className="navItem">
              <NavLink
                to="/favourite"
                className="navItemtxt"
                onClick={() => setIsOpen(false)}
              >
                <div>
                  <i
                    class="bi bi-heart-fill"
                    style={{ border: "1px solid green", padding: "0px 10px" }}
                  ></i>
                  Favourites
                </div>
              </NavLink>
            </li>

            <li className="navItem">
              <NavLink to="/createAlbum" className="navItemtxt">
                <div>
                  <i
                    class="bi bi-file-earmark-image"
                    style={{ border: "1px solid green", padding: "0px 10px" }}
                  ></i>
                  Create Album
                </div>
              </NavLink>
            </li>
            <li className="navItem">
              <NavLink
                to="/albums"
                className="navItemtxt"
                onClick={() => setIsOpen(false)}
              >
                <div>
                  <i
                    class="bi bi-file-earmark-image"
                    style={{ border: "1px solid green", padding: "0px 10px" }}
                  ></i>
                  Albums
                </div>
              </NavLink>
            </li>
            <li className="navItem">
              <i
                class="bi bi-person-square"
                style={{ border: "1px solid green", padding: "0px 10px" }}
              ></i>
              {user?.name}
              <button className="logOutBtn" onClick={handleLogOut}>
                Log Out
              </button>{" "}
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
};

export default Navbar;
