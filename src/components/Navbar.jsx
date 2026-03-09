import './navbar.css'; 
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <main>
      <div>
        <nav>
          <img
            src="./public/logo.png"
            alt="logo"
            style={{ width: 100, height: 100, marginLeft: "45px" }}
          />
          <ul className="navItems">
            <li className="navItem">
              <NavLink to="/galleryPick">Home</NavLink>
            </li>
            <li className="navItem">
              <NavLink to="/uploadImg">Upload Images</NavLink>
            </li>
            <li className="navItem">
              <NavLink to="/createAlbum">Create Album</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
};

export default Navbar;
