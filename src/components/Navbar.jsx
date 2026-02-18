import { NavLink } from "react-router-dom"


const Navbar = () => {
  return (
    <main>
        <div>
            <nav>
                <ul>
                    <li><NavLink to="/galleryPick"></NavLink></li>
                     <li><NavLink to="/uploadImg"></NavLink></li>
                      <li><NavLink to="/createAlbum"></NavLink></li>
                </ul>
            </nav>
        </div>
    </main>
  )
}

export default Navbar