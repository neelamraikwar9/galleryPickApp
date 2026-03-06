import { NavLink } from "react-router-dom"


const Navbar = () => {
  return (
    <main>
        <div>
            <nav>
                <ul>
                    <li><NavLink to="/galleryPick">Home</NavLink></li>
                     <li><NavLink to="/uploadImg">Upload Images</NavLink></li>
                      <li><NavLink to="/createAlbum">Create Album</NavLink></li>
                </ul>
            </nav>
        </div>
    </main>
  )
}

export default Navbar