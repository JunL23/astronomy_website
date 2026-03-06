import { useEffect } from 'react';
import Header from "../../components/header";
import './Skymap.css';

// Skymap page
function Skymap() {
    useEffect(() => {
        const jquery_script = document.createElement('script');
        jquery_script.src = '/lib/VirtualSky/stuquery.min.js';

        jquery_script.onload = () => {
            console.log("jquery script complete");

            const virtualsky = document.createElement('script');
            virtualsky.src = '/lib/VirtualSky/virtualsky.min.js';

            virtualsky.onload = () => {
                console.log("virtualsky complete");

                if(window.S) {
                    window.S.virtualsky({
                        id: 'starmap',
                        projection: 'gnomic', 
                        latitude: 34.4326, 
                        longitude: -119.86286,
                        fov: 120,
                        constellations: true,
                        constellationlabels: true
                    })
                }
            }

            document.body.appendChild(virtualsky);
        };

        document.body.appendChild(jquery_script);
    }, []);


    return (
        <div id='skymap-container'>
            <Header></Header>
            <div id="starmap" style={{width:"100%", height:"100vh"}}/>

        </div>
    )
}

export default Skymap;