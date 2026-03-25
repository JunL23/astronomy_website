import { useEffect, useRef, useState } from 'react';
import Header from "../../components/header";
import './Skymap.css';
import { useFetchLocation } from '../../custom_hook/useFetchLocation.js';

// Skymap page
function Skymap() {
    const { Location, Loading } = useFetchLocation();
    const [ object_name, setobject ] = useState("");
    const [ object_data, setobjectdata] = useState(null);

    // use useRef to prevent rerender everytime user typed into search bar
    const planetarium = useRef(null);

    const setObject = (e) => {
        console.log(object_name);
        setobject(e.target.value);
    }

    function get_object() {
        const full_url = "http://localhost:8000/simbad.php?id=" + encodeURIComponent(object_name);
        console.log(full_url);
        fetch(full_url)
        .then(response => response.json())
        .then((json_response) => {
            console.log(json_response);
            setobjectdata(json_response);
            planetarium.current.panTo(json_response.RA, json_response.DEC, 3000);

            planetarium.current.addPointer({
                ra: json_response.RA,
                dec: json_response.DEC,
                label: json_response.Common_name,
                colour: "#ffffff",
            });
            planetarium.current.draw();
        })
        .catch(error => {
            console.log(error);
    });
}


    // get the neccessary script needed for the Virtualsky skymap display
    // re-render after loading of user location's latitude and longitude is completed
    useEffect(() => {
        const jquery_script = document.createElement('script');
        jquery_script.src = '/lib/VirtualSky/stuquery.min.js';
        jquery_script.id = 'jquery';

        // ensure the user location's latitude and longitude is loaded before loading script and making the skymap
        if(!Loading && Location.latitude !== Infinity && Location.longitude !== Infinity) {
            jquery_script.onload = () => {
                console.log("jquery script complete");
    
                const virtualsky = document.createElement('script');
                virtualsky.src = '/lib/VirtualSky/virtualsky.min.js';
                virtualsky.id = 'virtualsky';
    
                virtualsky.onload = () => {
                    console.log("virtualsky complete");
    
                    if(window.S) {
                        const planetarium_load = window.S.virtualsky({
                            id: 'starmap',
                            projection: 'gnomic', 
                            latitude: Location.latitude, 
                            longitude: Location.longitude,
                            magnitude: 7,
                            fov: 120,
                            constellations: true,
                            constellationlabels: true,
                            objects: '/lib/VirtualSky/messier.json'
                        });

                        planetarium.current = planetarium_load;
                    }
                }
    
                document.body.appendChild(virtualsky);
            };
    
            document.body.appendChild(jquery_script);
        }

        // clean up function to get rid of scripts when component unmounts
        // without it will cause more and more script to added each time 
        // user goes from one page to the skymap page
        return () => {
            const jquery = document.getElementById('jquery');
            if(jquery) {
                document.body.removeChild(jquery);
            }

            const v_sky = document.getElementById('virtualsky');
            if(v_sky) {
                document.body.removeChild(v_sky);
            }
        }
    }, [Location, Loading]);


    // display loading screen when user location is being loaded
    if(Loading) {
        return (
            <div>
                <p>Loading skymap...</p>
            </div>
        )
    }

    return (
        <div id='skymap-container'>
            <Header></Header>

            <div id='skymap_search'>
                <input type="text" id='object-input' onChange={setObject} placeholder='Sky object you want to observe'></input>
                <button id='object-submit' onClick={() => get_object(object_name)}>Go to object</button>
            </div>

            {/* conditional render */}
            {object_data && <div id='info-container'>
                <h3>{object_data.Common_name}</h3>
                <strong>Main identifier: {object_data.Main_name}</strong>
                <strong>RA: {object_data.RA}</strong>
                <strong>DEC: {object_data.DEC}</strong>
            </div>}

            <div id="starmap" style={{width:"100%", height:"100vh"}}/>
        </div>
    )
}

export default Skymap;