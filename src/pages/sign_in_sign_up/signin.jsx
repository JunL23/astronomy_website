import { Link } from "react-router-dom";
import Header from "../../components/header";
import "./sign.css"

function Sign_in() {
    return (
        <div className="main_sign_container">
            <Header/>
            
            <div className="sign_in_box1">
                <div className="sign_in_box">
                    <h2>Sign in</h2>
                    <p>Welcome to this website, please put in your username</p>

                    <form className="sign_in_form">
                        <div>
                            <label htmlFor="username"><b>Username: </b></label>
                            <input name="username" type="text" placeholder="Please enter your username" id="username" ></input>

                            <br/>

                            <label htmlFor="password"><b>Password: </b></label>
                            <input name="password" type="password" placeholder="Please enter your password" id="password"></input>

                            <br/>
                            <button type="submit">Login</button>

                            <br/>
                            <p>Does not have an account? Click <Link to={"/sign_up"}>here</Link> to sign up</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Sign_in;