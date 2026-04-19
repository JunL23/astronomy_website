import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/header";
import "./sign.css"
import { useEffect, useState } from "react";

function Sign_in() {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [Message, setMessage] = useState(false);
    const nav = useNavigate();

    // async call to check if user has logged in
    useEffect(() => {
        const check_log = async () => {
            try {
                const response = await fetch("http://localhost:8000/check_log_in.php", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    }
                });

                // get returned values as text
                const result = await response.text(); // Get the response from the PHP backend
                setMessage(result)

                // navigate to home page is user has logged in
                if(result == "Logged in") {
                    setMessage(true)
                    console.log("Success")
                    nav('/Home')
                }
                else {
                    setMessage(false)
                }
            } catch (error) {
                setMessage(false)
                console.error("Error:", error);
            }
        };

        // call the function
        check_log();
    }, [nav])

    // function to authenticate users and navigate if authentication is successful
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const response = await fetch("http://localhost:8000/login.php", {
                method: "POST",
                credentials: "include",
                headers: {
                   "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    username: username,
                    password: password,
                }),
            });

            const result = await response.text(); // Get the response from the PHP backend
            // setMessage(result)

            if(result.includes("Success")) {
                console.log("Success")
                setMessage(true)
                nav('/Home')
            }
            else {
                setMessage(false)
            }
        } catch (error) {
            setMessage(false)
            console.error("Error:", error);
        }
    };

    return (
        <div className="main_sign_container">            
            <div className="sign_in_box1">
                <div className="sign_in_box">
                    <h2>Sign in</h2>
                    <p>Welcome to this website, please put in your username</p>

                    <form className="sign_in_form" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username"><b>Username: </b></label>
                            <input onChange={(e) => setusername(e.target.value)} required name="username" type="text" placeholder="Please enter your username" id="username" ></input>

                            <br/>

                            <label htmlFor="password"><b>Password: </b></label>
                            <input onChange={(e) => setpassword(e.target.value)} required name="password" type="password" placeholder="Please enter your password" id="password"></input>

                            <br/>
                            <button type="submit">Login</button>

                            <br/>
                            <p>Does not have an account? Click <Link to={"/sign_up"}>here</Link> to sign up</p>
                        </div>
                    </form>

                     {/* Message display if sign up failed */}
                    {Message && <p style={{backgroundColor: "red"}}>{Message}</p>}
                </div>
            </div>
        </div>
    )
}


export default Sign_in;