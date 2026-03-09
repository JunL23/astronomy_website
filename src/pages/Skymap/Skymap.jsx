import { useEffect } from 'react';
import Header from "../../components/header";
import './Skymap.css';
import { useFetchLocation } from '../../custom_hook/useFetchLocation.js';

// Skymap page
function Skymap() {
    const { Location, Loading } = useFetchLocation();

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
                        window.S.virtualsky({
                            id: 'starmap',
                            projection: 'gnomic', 
                            latitude: Location.latitude, 
                            longitude: Location.longitude,
                            magnitude: 7,
                            fov: 120,
                            constellations: true,
                            constellationlabels: true
                        })
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

            <div id='search'>
                <input type="text" id='object-input' placeholder='Sky object you want to observe'></input>
                <button id='object-submit'>Go to object</button>
            </div>

            <div id="starmap" style={{width:"100%", height:"100vh"}}/>
        </div>
    )
}

export default Skymap;