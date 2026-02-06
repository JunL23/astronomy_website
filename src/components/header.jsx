
function Header() {
    return (
        <header 
            id="web-header" 
            style={{
                backgroundColor: "black", 
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
                <a href="#" style={{color: "white"}}>Home</a>
                <a href="#" style={{color: "white"}}>Skymap</a>
                <a href="#" style={{color: "white"}}>Simulation</a>
            </nav>
        </header>
    )
};

export default Header;


