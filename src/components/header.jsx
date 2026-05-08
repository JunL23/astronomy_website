import { NavLink } from "react-router-dom";
import "./component.css";

function Header() {
    return (
        <header
            id="web-header">
            <nav id="header-nav">
                <NavLink to="/Home" style={{color: "white"}}>Home</NavLink>
                <NavLink to="/Skymap" style={{color: "white"}}>Skymap</NavLink>
                <NavLink to="/Sim" style={{color: "white"}}>Simulation</NavLink>
                <NavLink to="/Gallery" style={{color: "white"}}>Gallery</NavLink>
                <NavLink to="/Community" style={{color: "white"}}>Community</NavLink>
            </nav>
        </header>
    )
};

export default Header;


