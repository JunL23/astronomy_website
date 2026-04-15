import { useState } from "react";
import Galaxy from "./galaxy";
import Solar from "./planet";


function Simulation() {
    const [type, settype] = useState(1);
    const [ object_name, setobject ] = useState("");
    const [ input, setinput] = useState("");
    const [num_arm, setarm_num] = useState(0)
    const solar = ['sun', 'earth', 'jupiter', 'mars', 'mercury', 'moon', 'neptune', 'saturn', 'uranus'];

    const setObject = (e) => {
        console.log(object_name);
        setinput(e.target.value);
    }

   function get_object(object) {
        if(solar.includes(object.toLowerCase())) {
            settype(0);
            console.log('hi')
            return;
        }
        settype(1)
        const full_url = "http://localhost:8000/simbad.php?id=" + encodeURIComponent(object);
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
            }
            else {
                setarm_num(2);
            }
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
            {type ? <Galaxy arm={num_arm}/> : null}

            {type ? null : <Solar name={object_name}/>}
        </div>
    )
}

export default Simulation;