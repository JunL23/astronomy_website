import { useState } from "react";
import Galaxy from "./galaxy";
import Solar from "./planet";


function Simulation() {
    const [type, settype] = useState(1);
    const [ object_name, setobject ] = useState("");
    const [ input, setinput] = useState("");
    const [num_arm, setarm_num] = useState(0)

    // add a new key attribute to cause update every single time
    const [key, setkey] = useState(0);

    const solar = ['sun', 'earth', 'jupiter', 'mars', 'mercury', 'moon', 'neptune', 'saturn', 'uranus'];

    const setObject = (e) => {
        console.log(object_name);
        setinput(e.target.value);
    }

   function get_object(object) {
        if(solar.includes(object.toLowerCase())) {
            settype(0);
            setobject(object);
            return;
        }
        settype(1)
        const full_url = "https://junrongliu.rhody.dev/astronomy_website/backend/simbad.php?id=" + encodeURIComponent(object);
        console.log(full_url);
        fetch(full_url)
        .then(response => response.json())
        .then((json_response) => {
            console.log(json_response);
            if(json_response.type.startsWith('SAB') || json_response.type.startsWith('SAb') || json_response.type.startsWith('SBb')) {
                let num = Math.floor(Math.random() * (3 - 2 + 1)) + 2;
                setarm_num(num);
            }
            else if(json_response.type.startsWith('SAc') || json_response.type.startsWith('SBc')) {
                let num = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
                setarm_num(num);
                console.log("SBC arm: " + num_arm);
            }
            else {
                setarm_num(2);
            }

            setkey(key + 1);
            setobject(object);
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div>
            <div id='skymap_search'>
                <input type="text" id='object-input' onChange={setObject} placeholder='Sky object you want to observe'></input>
                <button id='object-submit' onClick={() => {get_object(input); setobject(input);}}>Go to object</button>
            </div>
            {type ? <Galaxy arm={num_arm} key={key}/> : null}

            {type ? null : <Solar name={object_name}/>}

            <h4 style={{position: "absolute", right: "20px", bottom: "0px", color: "white"}}>Solar system textures courtesy of
                <a href="https://www.solarsystemscope.com/textures/" target="_blank" rel="noopener noreferrer">
                    &nbsp;Solar System Scope &nbsp;
                </a>
                <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">
                    (CC BY 4.0) 
                </a>
                &nbsp;and&nbsp;
                <a href="https://science.nasa.gov/3d-resources/" target="_blank" rel="noopener noreferrer">
                    NASA
                </a>
            </h4>            
        </div>
    )
}

export default Simulation;