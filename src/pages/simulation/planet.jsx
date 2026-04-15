import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Header from "../../components/header";


function Planet_texture({name}) {
    let texture;

    if(name == 'jupiter') {
        texture = useTexture('solar_texture/2k_jupiter.jpg');
    }
    else if(name == 'mars') {
        texture = useTexture('solar_texture/2k_mars.jpg');
    }
    else if(name == 'mercury') {
        texture = useTexture('solar_texture/2k_mercury.jpg');
    }
    else if(name == 'moon') {
        texture = useTexture('solar_texture/2k_moon.jpg');
    }
    if(name == 'neptune') {
        texture = useTexture('solar_texture/2k_neptune.jpg');
    }
    else if(name == 'saturn') {
        texture = useTexture('solar_texture/2k_saturn.jpg');
    }
    else if(name == 'sun') {
        texture = useTexture('solar_texture/2k_sun.jpg');
    }
    else if(name == 'uranus') {
        texture = useTexture('solar_texture/2k_uranus.jpg');
    }
    else if(name == 'earth') {
        texture = useTexture('NASA_texture_map/1_earth_8k.jpg');
    }

    return (
        <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    )
}

function Solar({name}) {
    return (
        <div style={{height: '100vh'}}>
			<div>
				<Header></Header>
			</div>
            <Canvas camera={{position: [0, 0, 3], fov: 50}} style={{background: 'black'}}>
                <ambientLight intensity={0.5}></ambientLight>
                <Planet_texture name={name}/>
                <OrbitControls></OrbitControls>
                <Stars></Stars>
                <directionalLight position={[0, 5, 5]} intensity={5}/>
            </Canvas>
        </div>
    )
}


export default Solar;