import { useState } from "react";
import Search from "./Search";


function Community() {
    const [input, setinput] = useState("");

    <Search input={input} setinput={setinput}></Search>
}


export default Community;