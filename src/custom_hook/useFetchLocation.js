import { useEffect, useState } from "react";

// fetch user location
export function useFetchLocation() {
    const [Location, setLocation] = useState({ latitude: Infinity, longitude: Infinity });
    const [Loading, setLoading] = useState(true);

    // need to use useeffect to prevent infinite re render
    // as state changes cause re render and re render cause state changes
    // get user location latitude and longtitude
    useEffect(() => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((location) => {
                // TODO: Could optimize this more
                const latitude = Number(location.coords.latitude.toFixed(2));
                const longitude = Number(location.coords.longitude.toFixed(2));
                
                setLocation({ latitude, longitude });
                setLoading(false);
            });
        }

        else {
            console.log("Error");
            setLocation({ latitude: 0, longitude: 0 });
        }
    }, []);

    console.log(Location);
    return {Location, Loading};
}