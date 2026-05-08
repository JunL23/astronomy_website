import { useState } from "react";
import Search from "./Search";
import Header from "../../components/header"
import Thread from "./thread";
import User from "./user";
import Footer from "../../components/footer";
import Form from "./form";


function Community() {
    const [input, setinput] = useState("");
    const [showform, setshowform] = useState(false);
    const [search_post, setsearchpost] = useState([]);
    const [error, seterror] = useState(false);

    return (
        <div id="main-community-div">
            {
                showform ? <Form setForm={setshowform}/> :

                <div>
                    <Header/>
                    <Search input={input} setinput={setinput} setForm={setshowform} setsearchpost={setsearchpost}></Search>
                    
                    <div id="tc_bottom_component">
                        <div id="user-container">
                            <User/>
                        </div>

                        <div id="thread-container">
                            <Thread form={showform} searchpost={search_post}/>
                        </div>
                    </div>

                    <Footer/>
                </div>
            }

        </div>
    )
}


export default Community;