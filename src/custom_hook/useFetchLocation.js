import { useEffect, useState } from "react";

// fetch user location
export function useFetchLocation() {
    let count = 0;
    const [Location, setLocation] = useState({ latitude: Infinity, longitude: Infinity });
    const [Loading, setLoading] = useState(true);

    // need to use useeffect to prevent infinite re render
    // as state changes cause re render and re render cause state changes
    // get user location latitude and longtitude
    useEffect(() => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((location) => {
                count += 1;
                const { latitude, longitude } = location.coords;
                console.log("lag: " + latitude);
                console.log("long: " + longitude);
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