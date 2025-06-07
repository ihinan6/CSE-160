import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
// import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


function main() {

	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );


	const fov = 60;
	const aspect = window.innerWidth / window.innerHeight; // the canvas default
	const near = 0.1;
	const far = 100;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.set( 18, 1.5, 17 );

	const controls = new OrbitControls( camera, canvas );
	controls.target.set( -12, 0,  12);
	controls.update();

	const scene = new THREE.Scene();
	scene.background = new THREE.Color( 'black' );

	{

		const planeSize = 45;

		const loader = new THREE.TextureLoader();
		const texture = loader.load('textures/chevron.png');
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.magFilter = THREE.NearestFilter;
		texture.colorSpace = THREE.SRGBColorSpace;
		const repeats = planeSize / 2;
		texture.repeat.set( repeats, repeats );

		const planeGeo = new THREE.PlaneGeometry( planeSize, planeSize );
		const planeMat = new THREE.MeshPhongMaterial( {
			map: texture,
			side: THREE.DoubleSide,
		} );
		const mesh = new THREE.Mesh( planeGeo, planeMat );
		mesh.rotation.x = Math.PI * - .5;
		scene.add( mesh );

	}

    {
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            'textures/red4.png',
            'textures/red4.png',
            'textures/red5.png',
            'textures/red5.png',
            'textures/red4.png',
            'textures/red4.png'
       
        ]);
        scene.background = texture;
    }

	{

		// const cubeSize = 1;
		// const cubeGeo = new THREE.BoxGeometry( cubeSize, cubeSize, cubeSize );
		// const cubeMat = new THREE.MeshPhongMaterial( { color: '#880808' } );
		// const mesh = new THREE.Mesh( cubeGeo, cubeMat );

        // mesh.position.set(-11.5, 0.5, -11.5);
        // scene.add( mesh );

        var g_map=[
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0],
[0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0],
[0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0],
[0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0],
[0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0],
[0,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
[0,1,1,1,1,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0],
[0,1,1,1,1,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0],
[0,1,1,1,1,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            

        ];

        const geometry = new THREE.BoxGeometry(1, 6, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0xFF0000 });

        for (let x = 0; x < 40; x++) {
            for (let y = 0; y < 40; y++) {
                if (g_map[x][y] === 0) {
                    const cube = new THREE.Mesh(geometry, material); 
                    cube.position.set(x - 20, 2.5, y - 20);
                    scene.add(cube);
                }
            }
        }


		

	}

    {
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader();

        const stoneTexture = textureLoader.load('textures/stone.jpg');

        loader.load(
        'models/Horse Statue.glb',              // path to your .glb file
        function (gltf) {
            const model = gltf.scene;
            model.rotation.y = Math.PI;
            model.position.set(8.5, 0, 21);     // optional positioning
            model.scale.set(0.75, 0.75, 0.75);
            model.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                    map: stoneTexture
                    });
                }
            });
            scene.add(model);

            // spotlight 
            const spotLight = new THREE.SpotLight(0xffffff, 200); // color, intensity
            spotLight.position.set(8.5, 10, 15); // position above and in front of the model
            spotLight.angle = Math.PI / 12;       // cone spread
            spotLight.penumbra = 0.2;            // edge softness
            spotLight.decay = 2;                 // light dimming over distance
            spotLight.distance = 15;             // how far it reaches
            spotLight.castShadow = true;

            // Make the light aim at the model
            spotLight.target = model;
            scene.add(spotLight);
            scene.add(spotLight.target);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded'); // optional progress
        },
        function (error) {
            console.error('An error occurred while loading the GLB model:', error);
        }
        );
    }


    {
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader();

        const stoneTexture = textureLoader.load('textures/stone.jpg');

        loader.load(
        'models/Horse Statue.glb',              // path to your .glb file
        function (gltf) {
            const model = gltf.scene;
            model.rotation.y = Math.PI;
            model.position.set(-6, 0, 21);     // optional positioning
            model.scale.set(0.75, 0.75, 0.75);
            model.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                    map: stoneTexture
                    });
                }
            });
            scene.add(model);

            // spotlight 
            const spotLight = new THREE.SpotLight(0xffffff, 200); // color, intensity
            spotLight.position.set(-6, 10, 21); // position above and in front of the model
            spotLight.angle = Math.PI / 12;       // cone spread
            spotLight.penumbra = 0.2;            // edge softness
            spotLight.decay = 2;                 // light dimming over distance
            spotLight.distance = 15;             // how far it reaches
            spotLight.castShadow = true;

            // Make the light aim at the model
            spotLight.target = model;
            scene.add(spotLight);
            scene.add(spotLight.target);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded'); // optional progress
        },
        function (error) {
            console.error('An error occurred while loading the GLB model:', error);
        }
        );
    }

    {
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader();

        const stoneTexture = textureLoader.load('textures/stone.jpg');
        loader.load(
        'models/Stag Statue.glb',        
        function (gltf) {
            const model = gltf.scene;
            model.rotation.y = Math.PI;
            model.position.set(9, 0, 10.5);   

            model.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                    map: stoneTexture
                    });
                }
            });
            
            scene.add(model);
            // spotlight 
            const spotLight = new THREE.SpotLight(0xffffff, 150); // color, intensity
            spotLight.position.set(9, 10, 4.5); // position above and in front of the model
            spotLight.angle = Math.PI / -12;       // cone spread
            spotLight.penumbra = 0.2;            // edge softness
            spotLight.decay = 2;                 // light dimming over distance
            spotLight.distance = 15;             // how far it reaches
            spotLight.castShadow = true;

            // Make the light aim at the model
            spotLight.target = model;
            scene.add(spotLight);
            scene.add(spotLight.target);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded'); 
        },
        function (error) {
            console.error('An error occurred while loading the GLB model:', error);
        }
        );
    }

    {
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader();

        const stoneTexture = textureLoader.load('textures/stone.jpg');
        loader.load(
        'models/Stag Statue.glb',        
        function (gltf) {
            const model = gltf.scene;
            model.rotation.y = Math.PI;
            model.position.set(0, 0, 12);   

            model.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                    map: stoneTexture
                    });
                }
            });
            
            scene.add(model);
            // spotlight 
            const spotLight = new THREE.SpotLight(0xffffff, 150); // color, intensity
            spotLight.position.set(0, 10, 12); // position above and in front of the model
            spotLight.angle = Math.PI / -12;       // cone spread
            spotLight.penumbra = 0.2;            // edge softness
            spotLight.decay = 2;                 // light dimming over distance
            spotLight.distance = 15;             // how far it reaches
            spotLight.castShadow = true;

            // Make the light aim at the model
            spotLight.target = model;
            scene.add(spotLight);
            scene.add(spotLight.target);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded'); 
        },
        function (error) {
            console.error('An error occurred while loading the GLB model:', error);
        }
        );
    }


    {
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader();

        const stoneTexture = textureLoader.load('textures/stone.jpg');
        loader.load(
        'models/Stag Statue.glb',        
        function (gltf) {
            const model = gltf.scene;
            model.rotation.y = Math.PI;
            model.position.set(-18, 0, 0.5);   

            model.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                    map: stoneTexture
                    });
                }
            });
            
            scene.add(model);
            // spotlight 
            const spotLight = new THREE.SpotLight(0xffffff, 150); // color, intensity
            spotLight.position.set(-18, 10, 0.5); // position above and in front of the model
            spotLight.angle = Math.PI / -12;       // cone spread
            spotLight.penumbra = 0.2;            // edge softness
            spotLight.decay = 2;                 // light dimming over distance
            spotLight.distance = 15;             // how far it reaches
            spotLight.castShadow = true;

            // Make the light aim at the model
            spotLight.target = model;
            scene.add(spotLight);
            scene.add(spotLight.target);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded'); 
        },
        function (error) {
            console.error('An error occurred while loading the GLB model:', error);
        }
        );
    }



    

    {
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader();

        const stoneTexture = textureLoader.load('textures/stone.jpg');
        loader.load(
        'models/Fox Statue.glb',        
        function (gltf) {
            const model = gltf.scene;
            model.rotation.y = Math.PI;
            model.position.set(17, 0, 12);   
            
            model.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                    map: stoneTexture
                    });
                }
            });

            scene.add(model);

            // spotlight 
            const spotLight = new THREE.SpotLight(0xffffff, 150); // color, intensity
            spotLight.position.set(17, 10, 6); // position above and in front of the model
            spotLight.angle = Math.PI / 8;       // cone spread
            spotLight.penumbra = 0.2;            // edge softness
            spotLight.decay = 2;                 // light dimming over distance
            spotLight.distance = 30;             // how far it reaches
            spotLight.castShadow = true;

            // Make the light aim at the model
            spotLight.target = model;
            scene.add(spotLight);
            scene.add(spotLight.target);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded'); 
        },
        function (error) {
            console.error('An error occurred while loading the GLB model:', error);
        }
        );
    }

    {
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader();

        const stoneTexture = textureLoader.load('textures/stone.jpg');
        loader.load(
        'models/Fox Statue.glb',        
        function (gltf) {
            const model = gltf.scene;
            model.rotation.y = Math.PI;
            model.position.set(-18, 0, 16);   
            
            model.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                    map: stoneTexture
                    });
                }
            });

            scene.add(model);

            // spotlight 
            const spotLight = new THREE.SpotLight(0xffffff, 150); // color, intensity
            spotLight.position.set(-18, 10, 16); // position above and in front of the model
            spotLight.angle = Math.PI / 8;       // cone spread
            spotLight.penumbra = 0.2;            // edge softness
            spotLight.decay = 2;                 // light dimming over distance
            spotLight.distance = 30;             // how far it reaches
            spotLight.castShadow = true;

            // Make the light aim at the model
            spotLight.target = model;
            scene.add(spotLight);
            scene.add(spotLight.target);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded'); 
        },
        function (error) {
            console.error('An error occurred while loading the GLB model:', error);
        }
        );
    }

    {
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader();

        const stoneTexture = textureLoader.load('textures/stone.jpg');
        loader.load(
        'models/Fox Statue.glb',        
        function (gltf) {
            const model = gltf.scene;
            model.rotation.y = Math.PI;
            model.position.set(-18, 0, -4);   
            
            model.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                    map: stoneTexture
                    });
                }
            });

            scene.add(model);

            // spotlight 
            const spotLight = new THREE.SpotLight(0xffffff, 150); // color, intensity
            spotLight.position.set(-18, 10, -4); // position above and in front of the model
            spotLight.angle = Math.PI / 8;       // cone spread
            spotLight.penumbra = 0.2;            // edge softness
            spotLight.decay = 2;                 // light dimming over distance
            spotLight.distance = 30;             // how far it reaches
            spotLight.castShadow = true;

            // Make the light aim at the model
            spotLight.target = model;
            scene.add(spotLight);
            scene.add(spotLight.target);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded'); 
        },
        function (error) {
            console.error('An error occurred while loading the GLB model:', error);
        }
        );
    }

    {
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader();

        const stoneTexture = textureLoader.load('textures/stone.jpg');
        loader.load(
        'models/Doggi statue.glb',        
        function (gltf) {
            const model = gltf.scene;
            model.rotation.y = Math.PI/2;
            model.position.set(4, 0, 6.25); 
            model.scale.set(3,3,3);  
            model.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                    map: stoneTexture
                    });
                }
            });
            
            scene.add(model);

            // spotlight 
            const spotLight = new THREE.SpotLight(0xffffff, 150); // color, intensity
            spotLight.position.set(4, 10, 0.25); // position above and in front of the model
            spotLight.angle = Math.PI / 8;       // cone spread
            spotLight.penumbra = 0.2;            // edge softness
            spotLight.decay = 2;                 // light dimming over distance
            spotLight.distance = 30;             // how far it reaches
            spotLight.castShadow = true;

            // Make the light aim at the model
            spotLight.target = model;
            scene.add(spotLight);
            scene.add(spotLight.target);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded'); 
        },
        function (error) {
            console.error('An error occurred while loading the GLB model:', error);
        }
        );
    }

    {
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader();

        const stoneTexture = textureLoader.load('textures/stone.jpg');
        loader.load(
        'models/Doggi statue.glb',        
        function (gltf) {
            const model = gltf.scene;
            model.rotation.y = Math.PI/2;
            model.position.set(-10, 0, 0); 
            model.scale.set(3,3,3);  
            model.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                    map: stoneTexture
                    });
                }
            });
            
            scene.add(model);

            // spotlight 
            const spotLight = new THREE.SpotLight(0xffffff, 150); // color, intensity
            spotLight.position.set(-10, 10, 0); // position above and in front of the model
            spotLight.angle = Math.PI / 8;       // cone spread
            spotLight.penumbra = 0.2;            // edge softness
            spotLight.decay = 2;                 // light dimming over distance
            spotLight.distance = 30;             // how far it reaches
            spotLight.castShadow = true;

            // Make the light aim at the model
            spotLight.target = model;
            scene.add(spotLight);
            scene.add(spotLight.target);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded'); 
        },
        function (error) {
            console.error('An error occurred while loading the GLB model:', error);
        }
        );
    }


    {
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader();

        const stoneTexture = textureLoader.load('textures/stone.jpg');
        loader.load(
        'models/ram.glb',        
        function (gltf) {
            const model = gltf.scene;
            model.rotation.y = Math.PI/2;
            model.position.set(5, 1.5, -9);   
            
            model.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                    map: stoneTexture
                    });
                }
            });

            scene.add(model);

            // spotlight 
            const spotLight = new THREE.SpotLight(0xffffff, 150); // color, intensity
            spotLight.position.set(5, 10, -9); // position above and in front of the model
            spotLight.angle = Math.PI / 8;       // cone spread
            spotLight.penumbra = 0.2;            // edge softness
            spotLight.decay = 2;                 // light dimming over distance
            spotLight.distance = 30;             // how far it reaches
            spotLight.castShadow = true;

            // Make the light aim at the model
            spotLight.target = model;
            scene.add(spotLight);
            scene.add(spotLight.target);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded'); 
        },
        function (error) {
            console.error('An error occurred while loading the GLB model:', error);
        }
        );
    }


    // red room --------------------------------------------------------

    {
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader();

        const stoneTexture = textureLoader.load('textures/stone.jpg');
        loader.load(
        'models/Statue.glb',        
        function (gltf) {
            const model = gltf.scene;
            model.rotation.y = 3*Math.PI/2;
            model.position.set(-8, 1.25, -13);   
            model.scale.set(1.25, 1.25, 1.25);
            
            model.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                    map: stoneTexture
                    });
                }
            });

            scene.add(model);

            // spotlight 
            const spotLight = new THREE.SpotLight(0xffffff, 150); // color, intensity
            spotLight.position.set(-8, 10, -13); // position above and in front of the model
            spotLight.angle = Math.PI / 8;       // cone spread
            spotLight.penumbra = 0.2;            // edge softness
            spotLight.decay = 2;                 // light dimming over distance
            spotLight.distance = 30;             // how far it reaches
            spotLight.castShadow = true;

            // Make the light aim at the model
            spotLight.target = model;
            scene.add(spotLight);
            scene.add(spotLight.target);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded'); 
        },
        function (error) {
            console.error('An error occurred while loading the GLB model:', error);
        }
        );
    }
    {
        const loader = new GLTFLoader();

        loader.load(
            'models/couch.glb',        
            function (gltf) {
                const model = gltf.scene;
                model.rotation.y = -Math.PI / 2;
                model.position.set(-9.5, 0, -14);
                model.scale.set(0.8, 0.8, 0.8);   

                model.traverse((child) => {
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            color: 0x451207  // Dark red
                        });
                    }
                });

                scene.add(model);
            },
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded'); 
                },
                function (error) {
                    console.error('An error occurred while loading the GLB model:', error);
                }
        );

        
    }

    {
        const loader = new GLTFLoader();

        loader.load(
            'models/couch.glb',        
            function (gltf) {
                const model = gltf.scene;
                model.rotation.y = -Math.PI / 2;
                model.position.set(-9.5, 0, -12);
                model.scale.set(0.8, 0.8, 0.8);   

                model.traverse((child) => {
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            color: 0x451207  // Dark red
                        });
                    }
                });

                scene.add(model);
            },
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded'); 
                },
                function (error) {
                    console.error('An error occurred while loading the GLB model:', error);
                }
        );


    }

	{

		// const sphereRadius = 3;
		// const sphereWidthDivisions = 32;
		// const sphereHeightDivisions = 16;
		// const sphereGeo = new THREE.SphereGeometry( sphereRadius, sphereWidthDivisions, sphereHeightDivisions );
		// const sphereMat = new THREE.MeshPhongMaterial( { color: '#CA8' } );
		// const mesh = new THREE.Mesh( sphereGeo, sphereMat );
		// mesh.position.set( - sphereRadius - 1, sphereRadius + 2, 0 );
		// scene.add( mesh );

	}

    {
        const loader = new GLTFLoader();

        loader.load(
            'models/couch.glb',        
            function (gltf) {
                const model = gltf.scene;
                model.position.set(-13, 0, -17);
                model.scale.set(0.8, 0.8, 0.8);   

                model.traverse((child) => {
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            color: 0x451207  // Dark red
                        });
                    }
                });

                scene.add(model);
            },
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded'); 
                },
                function (error) {
                    console.error('An error occurred while loading the GLB model:', error);
                }
        );
    }

    {
        const loader = new GLTFLoader();

        loader.load(
            'models/table.glb',        
            function (gltf) {
                const model = gltf.scene;
                model.position.set(-14.5, 0, -16.75);
                model.scale.set(2, 2, 2);   

                scene.add(model);
            },
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded'); 
                },
                function (error) {
                    console.error('An error occurred while loading the GLB model:', error);
                }
        );
    }

    {
        const loader = new GLTFLoader();

        loader.load(
            'models/lamp.glb',        
            function (gltf) {
                const model = gltf.scene;
                model.position.set(-8, 1.25, -16);
                model.scale.set(3, 3, 3);  

                scene.add(model);

                // spotlight 
            const spotLight = new THREE.SpotLight(0xffffff, 150); // color, intensity
            spotLight.position.set(-8, 10, -13); // position above and in front of the model
            spotLight.angle = Math.PI / 8;       // cone spread
            spotLight.penumbra = 0.2;            // edge softness
            spotLight.decay = 2;                 // light dimming over distance
            spotLight.distance = 30;             // how far it reaches
            spotLight.castShadow = true;

            // Make the light aim at the model
            spotLight.target = model;
            scene.add(spotLight);
            scene.add(spotLight.target);
            },
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded'); 
                },
                function (error) {
                    console.error('An error occurred while loading the GLB model:', error);
                }
        );
    }

     {
        const loader = new GLTFLoader();

        loader.load(
            'models/lamp.glb',        
            function (gltf) {
                const model = gltf.scene;
                model.position.set(-8, 1.25, -10);
                model.scale.set(3, 3, 3);  

                scene.add(model);

                // spotlight 
            const spotLight = new THREE.SpotLight(0xffffff, 150); // color, intensity
            spotLight.position.set(-8, 10, -9); // position above and in front of the model
            spotLight.angle = Math.PI / 8;       // cone spread
            spotLight.penumbra = 0.2;            // edge softness
            spotLight.decay = 2;                 // light dimming over distance
            spotLight.distance = 30;             // how far it reaches
            spotLight.castShadow = true;

            // Make the light aim at the model
            spotLight.target = model;
            scene.add(spotLight);
            scene.add(spotLight.target);
            },
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded'); 
                },
                function (error) {
                    console.error('An error occurred while loading the GLB model:', error);
                }
        );
    }

    {

        const radius = 0.15;
        const height = 0.4;
        const radialSegments = 16;

        const geometry = new THREE.ConeGeometry(radius, height, radialSegments);
        const material = new THREE.MeshStandardMaterial({ color: 0xc9cdb2 }); 
        const cone = new THREE.Mesh(geometry, material);
        

        cone.position.set(-14.25, 1.15, -16.75); // Raise cone so it sits on the ground

        scene.add(cone);

    }


    let icosahedron;

    {
        const radius = 0.15;

        const geometry = new THREE.IcosahedronGeometry(radius);
        const material = new THREE.MeshStandardMaterial({ 
            color: 0xc9cdb2, 
            emissive: 0xc9cdb2, 
            emissiveIntensity: 1 
        });

        icosahedron = new THREE.Mesh(geometry, material);
        icosahedron.position.set(-14.25, 1.5, -16.75);

        scene.add(icosahedron);

        const spotLight = new THREE.SpotLight(0xffffff, 150); // color, intensity
            spotLight.position.set(-8, 10, -16.75); // position above and in front of the model
            spotLight.angle = Math.PI / 8;       // cone spread
            spotLight.penumbra = 0.2;            // edge softness
            spotLight.decay = 2;                 // light dimming over distance
            spotLight.distance = 30;             // how far it reaches
            spotLight.castShadow = true;

            // Make the light aim at the model
            spotLight.target = icosahedron;
            scene.add(spotLight);
            scene.add(spotLight.target);

        
    }


    

	{

		// const sphereRadius = 3;
		// const sphereWidthDivisions = 32;
		// const sphereHeightDivisions = 16;
		// const sphereGeo = new THREE.SphereGeometry( sphereRadius, sphereWidthDivisions, sphereHeightDivisions );
		// const sphereMat = new THREE.MeshPhongMaterial( { color: '#CA8' } );
		// const mesh = new THREE.Mesh( sphereGeo, sphereMat );
		// mesh.position.set( - sphereRadius - 1, sphereRadius + 2, 0 );
		// scene.add( mesh );

	}

	class ColorGUIHelper {

		constructor( object, prop ) {

			this.object = object;
			this.prop = prop;

		}
		get value() {

			return `#${this.object[ this.prop ].getHexString()}`;

		}
		set value( hexString ) {

			this.object[ this.prop ].set( hexString );

		}

	}

	{

		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.DirectionalLight( color, intensity );
        light.position.set(0,10,0);
        light.target.position.set(-5, 0, 0);
		scene.add( light );
        scene.add(light.target);

        const ambient = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambient);

		// const gui = new GUI();
		// gui.addColor( new ColorGUIHelper( light, 'color' ), 'value' ).name( 'color' );
		// gui.add( light, 'intensity', 0, 5, 0.01 );
        // gui.add(light.target.position, 'x', -10, 10);
        // gui.add(light.target.position, 'z', -10, 10);
        // gui.add(light.target.position, 'y', 0, 10);

	}

	function resizeRendererToDisplaySize( renderer ) {

		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if ( needResize ) {

			renderer.setSize( width, height, false );

		}

		return needResize;

	}

	function render() {

		if ( resizeRendererToDisplaySize( renderer ) ) {

			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();

		}

		renderer.render( scene, camera );

		requestAnimationFrame( render );

	}

	requestAnimationFrame( render );


    const keysPressed = {};

    window.addEventListener('keydown', (event) => {
        keysPressed[event.key.toLowerCase()] = true;
    });

    window.addEventListener('keyup', (event) => {
        keysPressed[event.key.toLowerCase()] = false;
    });

    function animate() {
        requestAnimationFrame(animate);

        const speed = 0.1;
        const rotationSpeed = 0.03;

        // forward (w)
        if (keysPressed['w']) {
            camera.position.x -= Math.sin(camera.rotation.y) * speed;
            camera.position.z -= Math.cos(camera.rotation.y) * speed;

            camera.rotation.x = 0;
            camera.rotation.z = 0;
        }

        // backward (s)
        if (keysPressed['s']) {
            camera.position.x += Math.sin(camera.rotation.y) * speed;
            camera.position.z += Math.cos(camera.rotation.y) * speed;

            camera.rotation.x = 0;
            camera.rotation.z = 0;
        }

        // left (a)
        if (keysPressed['a']) {
            camera.position.x -= Math.cos(camera.rotation.y) * speed;
            camera.position.z += Math.sin(camera.rotation.y) * speed;
            camera.rotation.x = 0;
            camera.rotation.z = 0;
        }

        // right (d)
        if (keysPressed['d']) {
            camera.position.x += Math.cos(camera.rotation.y) * speed;
            camera.position.z -= Math.sin(camera.rotation.y) * speed;

            camera.rotation.x = 0;
            camera.rotation.z = 0;
        }

        // rotate left (q)w
        if (keysPressed['q']) {
            camera.rotation.y += rotationSpeed;

            camera.rotation.x = 0;
            camera.rotation.z = 0;
        }

        // rotate right (e)
        if (keysPressed['e']) {
            camera.rotation.y -= rotationSpeed;

            camera.rotation.x = 0;
            camera.rotation.z = 0;
        }

        if (icosahedron) {
            icosahedron.rotation.x += 0.01;
            icosahedron.rotation.y += 0.01;
        }   
        
        renderer.render(scene, camera);
    }
    animate();

    {
        const walkSound = new Audio('footsteps.mp3');
        walkSound.volume = 0.5; // optional: adjust volume
        walkSound.loop = false; // set true if you want it to keep playing

        let walking = false;

window.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if ((key === 'w' || key === 's' || key === 'a' || key === 'd')  && !walking) {
        walking = true;
        walkSound.currentTime = 0; // rewind to start
        walkSound.play();
    }
    keysPressed[key] = true;
    });

    window.addEventListener('keyup', (event) => {
        const key = event.key.toLowerCase();
        if ((key === 'w' || key === 's' || key === 'a' || key === 'd')) {
            walking = false;
            walkSound.pause();
            walkSound.currentTime = 0; // reset to start
        }
        keysPressed[key] = false;
    });




    }


}

main();