import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header 
            id="web-header" 
            style={{
                backgroundColor: "aqua", 
                height: "40px", 
                width: "100%",
                textAlign: "end"
            }}
        >
            <nav 
                style={{
                    display: "flex", 
                    gap: "20px", 
                    alignItems: "center", 
                    height: "100%", 
                    justifyContent: "flex-end", 
                    paddingRight: "20px"
                }}
            >
                <NavLink to="/" style={{color: "white"}}>Home</NavLink>
                <NavLink to="/Skymap" style={{color: "white"}}>Skymap</NavLink>
            </nav>
        </header>
    )
};

export default Header;


