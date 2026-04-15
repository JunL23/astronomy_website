import { OrbitControls, Points, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import random from 'random';
import {useMemo, useRef } from 'react';
import Header from '../../components/header';

const star_amount = 100000;

// Failed attempt to get stretch ratio of an image of an object
async function get_stretch_ratio(object) {
	const full_url = "http://localhost:8000/skyview.php?id=" + encodeURIComponent(object);
	const data = await fetch(full_url);
	const image_blob = await data.blob();

	const img = new Image();
	const image_url = URL.createObjectURL(image_blob);
	img.src = image_url;

	let minX = Infinity;
	let minY = Infinity;
	let maxX = 0;
	let maxY = 0;

	// this is async, caused problems as function skips to the next part immediately
	// so I used promise to wait for it to finish
	// resolve is I think the signal indicating if operation is finished and tells the function what to return
	return new Promise((resolve) => {
		img.onload = () => {
			const canvas = document.createElement("canvas");
			canvas.width = "256";
			canvas.height = "256";
	
			const ctx = canvas.getContext("2d");
	
			ctx.drawImage(img, 0, 0);
			const img_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
			const data = img_data.data;
	
			for(let i = 0; i < data.length; i+=4) {
				let index = i / 4;
				if(data[i] > 50) {
					let col = i % canvas.width;
					let row = Math.floor(index / canvas.width);
	
					maxX = Math.max(maxX, col);
					maxY = Math.max(maxY, row);
					minX = Math.min(minX, col);
					minY = Math.min(minY, row);
				}
			}
			let light_width = maxX - minX;
			let light_height= maxY - minY;
		
			let ratio = light_width / light_height;
		
			ratio = Math.min(Math.max(0.2, ratio), 4.5);
		
			URL.revokeObjectURL(image_url);
			resolve(ratio);
		}
	});

}

function get_star_color(radius, max_radius) {
	let normalized_r = radius / max_radius;
	let color;

	if(normalized_r < 0.2) {
		color = {r: 1, g: 0.7, b: 0.3}
	}

	else if(normalized_r < 0.5) {
		if(Math.random() > 0.8) {
			color = {r: 0.3, g: 0.5, b: 2}
		}
		else {
			color = {r: 1, g: 0.9, b: 0.97}
		}
	}

	else {
		let chance = Math.random();

		if(chance > 0.95) {
			color = {r: 1, g: 0.4, b: 0.7}
		}
		else if(chance > 0.7) {
			color = {r: 0.3, g: 0.6, b: 2}
		}
		else {
			color = {r: 0.9, g: 0.9, b: 1}
		}
	}

	return color;
}

function galaxy_generate(arm) {
	// let ratio = await get_stretch_ratio("m31");
	// console.log(ratio);
	const array = new Float32Array(star_amount * 3);
	const color_arr = new Float32Array(star_amount * 3);
	const max_radius = 100;
	const pitch = Math.random() * 0.6 + 0.3;
	// const arm = 2;
	const amp = 0.3;

	for(let i = 0; i < star_amount; i++) {
		let r = max_radius * (Math.random()) ** 2;

		if(Math.random() <= 0.05) {
			r += random.normal(0, 5)();
			r = Math.max(r, 0.01);
		}

		let star_color = get_star_color(r, max_radius);

		let wave = 1/pitch * Math.log(r + 0.01);

		let angle_init = random.float(0, 2 * Math.PI);
		let clump = amp * (r / max_radius);
		let angle_final = angle_init + wave + clump * Math.sin(arm * (angle_init - wave));

		let x = r * Math.cos(angle_final);
		let z = r * Math.sin(angle_final);
		let y = random.normal(0, 3)() * (1 - r / max_radius) + random.normal(0, 0.2)();

		let index = i * 3;

		array[index] = x;
		array[index + 1] = y;
		array[index + 2] = z;
		const intensity = Math.random() * 0.6 + 0.2;

		color_arr[index]     = star_color.r * intensity;
		color_arr[index + 1] = star_color.g * intensity;
		color_arr[index + 2] = star_color.b * intensity;
	}

	return [array, color_arr];
}

function Galaxy({arm}) {
	// fix size array very efficient for 3D rendering
	console.log("arm is: " + arm)
	const [star_positions, star_colors] = useMemo(() => galaxy_generate(arm), [arm]);
	// const [star_positions, setstar_object] = useState(null);
	const object_name = useRef("");

	// useEffect(() => {
	// 	async function getGalaxy() {
	// 		const position = await galaxy_generate();
	// 		setstar_object(position);
	// 	}

	// 	getGalaxy();
	// }, []);


	return (
		<div style={{height: '100vh'}}>
			<div>
				<Header></Header>
			</div>
			<Canvas camera={{ position: [100, 300, 200], fov: 30}} style={{background: 'black'}}>
				<Points positions={star_positions} colors={star_colors}>
					<pointsMaterial size={1} vertexColors/>
				</Points>
				<ambientLight intensity={0.4}></ambientLight>
				<pointLight></pointLight>
				<OrbitControls></OrbitControls>
				<Stars></Stars>
			</Canvas>
		</div>
	)
}

export default Galaxy;