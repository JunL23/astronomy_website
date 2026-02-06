
function Footer() {
    return (
        <footer 
            style={{
                backgroundColor: "lightblue",
                width: "100%",
                minHeight: "100px",
                marginTop: "100px",
                display: "flex",
                gap:"100px",
                justifyContent: "center"
            }}
        >
            <div>
                <h3 style={{color: "black"}}>Thank you for visiting this website!</h3>
                <p style={{maxWidth: "400px"}}>If you have any questions, please contact me at my email address</p>
            </div>

            <div>
                <h3>Purpose of this website</h3>
                <p style={{maxWidth: "400px"}}>This website is a project of mine made for a school project. The website is made to allow people who likes or are interested 
                   in astronomy. The website provide a few tools to make observing astronomical objects easier and also provide some visualization
                   to them. Another purpose of making this website was to allow me to learn and practice full stack development skills.
                </p>
            </div>


            <nav>
                <h2>Other useful links</h2>
                <a href="#">About</a>
            </nav>
        </footer>
    )
};

export default Footer;