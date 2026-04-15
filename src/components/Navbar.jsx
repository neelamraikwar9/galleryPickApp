import "./navbar.css";
import { NavLink } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

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
          <div className="navLogo">
            <img
              src="/logo.png"
              alt="logo"
              className="logo"
              style={{
                width: 70,
                height: 70,
                border: "1px solid green",
                marginTop: "10px",
              }}
            />
            <h1>GalleryPick</h1>
          </div>
          <ul className="navItems">
            <li className="navItem">
              <NavLink to="/galleryPick" className="navItemtxt">
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
              <NavLink to="/uploadImg" className="navItemtxt">
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
              <NavLink to="/favourite" className="navItemtxt">
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
              {/* <div className="userAccCon"> */}
              {/* <div className="profCont"> */}
                <i
                  class="bi bi-person-square"
                  style={{ border: "1px solid green", padding: "0px 10px" }}
                ></i>
                {loggedInUser}
                <button className="logOutBtn" onClick={handleLogOut}>Log Out</button> {/* </div> */}
              {/* </div> */}
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
};

export default Navbar;
