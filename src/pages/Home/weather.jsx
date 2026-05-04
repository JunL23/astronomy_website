import { useEffect, useState } from "react";
import { useFetchLocation } from "../../custom_hook/useFetchLocation";

function Weather_container() {
    const {Location, Loading} = useFetchLocation();
    const [weather, setweather] = useState("");
    const [sunrise, setsunrise] = useState("");
    const [sunset, setsunset] = useState("");
    const [icon, seticon] = useState("10d");
    const [success, setsuccess] = useState(false)

    useEffect(() => {
        console.log("Success useeffect");
         if(!Loading && Location.latitude !== Infinity && Location.longitude !== Infinity) {
            console.log("Success php api called");
            const fetchweather = async () => {
                const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                const response = await fetch('http://localhost:8000/weather.php', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        lat: Location.latitude,
                        lon: Location.longitude,
                        timezone: timezone
                    })
                });
                const json_data = await response.json();
                console.log(json_data);

                if(!json_data['Success']) {
                    return;
                }

                setweather(json_data['Weather']);
                setsunrise(json_data['Sunrise']);
                setsunset(json_data['Sunset']);
                setsuccess(true);
                seticon(json_data['Icon']);
            }

            fetchweather();
        }

        return
    }, [Location, Loading]);

    return (
        <div id="weather">
            {Loading && <><h2>☀️ Weather today</h2><h2>🌅 Sunrise time</h2><h2>🌇 Sunset time</h2></>}

            {!Loading && <div style={{maxWidth: "150px"}}>
                <div id="small-weather">
                    <img style={{width: "50px", height: "50px"}} src={`https://openweathermap.org/img/wn/${icon}@2x.png`}></img>
                    <h2>{weather}</h2>
                </div>
                <h2 style={{marginTop: '0px'}}>🌅 {sunrise}</h2>
                <h2>🌇 {sunset}</h2>
                <h4>Weather data provided by <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">OpenWeather</a></h4>
            </div>}
        </div>
    )
};

export default Weather_container;