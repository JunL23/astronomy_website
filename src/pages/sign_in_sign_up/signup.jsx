import { useState } from "react";
import Header from "../../components/header";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [Message, setMessage] = useState("");
    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const response = await fetch("http://localhost:8000/signup.php", {
                method: "POST",
                headers: {
                   "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    username: username,
                    password: password,
                }),
            });

            const result = await response.text(); // Get the response from the PHP backend
            setMessage(result)

            if(result.includes("Success")) {
                nav('/')
            }
        } catch (error) {
            setMessage("Error in sign up")
            console.error("Error:", error);
        }
    };

    return(
        <div className="main_sign_container">
            <Header/>
            
            <div className="sign_in_box1">
                <div className="sign_in_box">
                    <h2>Sign up</h2>
                    <p>Welcome to this website, please make a username</p>

                    <form className="sign_in_form" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username"><b>Username: </b></label>
                            <input name="username" onChange={(e) => setusername(e.target.value)} required type="text" placeholder="Please enter your username" id="username" ></input>

                            <br/>

                            <label htmlFor="password"><b>Password: </b></label>
                            <input name="password" onChange={(e) => setpassword(e.target.value)} required type="password" placeholder="Please enter your password" id="password"></input>

                            <br/>
                            <button type="submit">Sign up</button>

                            <br/>
                            <p>Already have an account? Click <Link to={"/"}>here</Link> to sign in</p>
                        </div>
                    </form>

                    {/* Message display if sign up failed */}
                    {Message && <p style={{backgroundColor: "red"}}>{Message}</p>}
                </div>
            </div>
        </div>
    )
}

export default Signup;