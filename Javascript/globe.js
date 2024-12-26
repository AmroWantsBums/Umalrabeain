import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.154.0/build/three.module.js";

// Create scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(50);

// Create renderer with transparent background
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
    alpha: true // Enable transparency
});
renderer.setPixelRatio(window.devicePixelRatio); // Set pixel ratio for high-DPI displays
renderer.setSize(window.innerWidth / 5, window.innerHeight / 5);
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

// Add ambient light
const ambientLight = new THREE.AmbientLight(0x6b6b6b);
scene.add(ambientLight);

// Load textures
const uvTexture = new THREE.TextureLoader().load("../Images/8k_earth_daymap.jpeg");
const normalMap = new THREE.TextureLoader().load("../Images/8k_earth_normal_map_(0-00-00-00).jpg");
const specularMap = new THREE.TextureLoader().load("../Images/8k_earth_specular_map.png");
const cloudTexture = new THREE.TextureLoader().load("../Images/8k_earth_clouds.jpeg");

// Create sphere and cloud materials
const material = new THREE.MeshStandardMaterial({
    map: uvTexture,
    normalMap: normalMap,
    normalScale: new THREE.Vector2(1, 4),
    specularMap: specularMap
});

const cloudMaterial = new THREE.MeshBasicMaterial({
    map: cloudTexture,
    transparent: true,
    opacity: 0.081
});

const sphereGeometry = new THREE.SphereGeometry(window.innerWidth * 0.018, 64, 32);
const cloudGeometry = new THREE.SphereGeometry(window.innerWidth * 0.0182, 64, 32);

// Create sphere and cloud meshes
const sphere = new THREE.Mesh(sphereGeometry, material);
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);

scene.add(sphere);
scene.add(cloudMesh);

const pointer = new THREE.Vector2();
let isMouseMoved = false;

// Track mouse movement
const onMouseMoved = (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    isMouseMoved = true;
};

window.addEventListener("mousemove", onMouseMoved);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    sphere.rotation.x = pointer.y * Math.PI * 2; 
    sphere.rotation.y = pointer.x * Math.PI * 2; 

    cloudMesh.rotation.x = pointer.y * Math.PI * 0.5; 
    cloudMesh.rotation.y = pointer.x * Math.PI * 0.5; 

    renderer.render(scene, camera);
}

animate();
