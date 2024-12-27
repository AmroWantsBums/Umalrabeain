import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.154.0/build/three.module.js";

// Create scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(50);

// Create renderer with transparent background
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
    alpha: true, // Enable transparency
});
renderer.setPixelRatio(window.devicePixelRatio);
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

// Create materials
const material = new THREE.MeshStandardMaterial({
    map: uvTexture,
    normalMap: normalMap,
    normalScale: new THREE.Vector2(1, 4),
    specularMap: specularMap,
});

const cloudMaterial = new THREE.MeshBasicMaterial({
    map: cloudTexture,
    transparent: true,
    opacity: 0.081,
});

let sphere, cloudMesh;

// Function to create sphere and cloud meshes
function createMeshes() {
    const sphereRadius = window.innerWidth * 0.018;
    const cloudRadius = window.innerWidth * 0.0182;

    const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 64, 32);
    const cloudGeometry = new THREE.SphereGeometry(cloudRadius, 64, 32);

    if (sphere) scene.remove(sphere);
    if (cloudMesh) scene.remove(cloudMesh);

    sphere = new THREE.Mesh(sphereGeometry, material);
    cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);

    scene.add(sphere);
    scene.add(cloudMesh);
}

// Function to handle resizing
function resizeProportions() {
    // Update renderer size
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth / 5, window.innerHeight / 5);

    // Update camera aspect ratio and projection matrix
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Recreate meshes to maintain quality
    createMeshes();

    console.log("Resized and updated meshes.");
}

// Add resize event listener
window.addEventListener("resize", resizeProportions);

// Create initial meshes
createMeshes();

const pointer = new THREE.Vector2();

// Track mouse movement
const onMouseMoved = (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
};

window.addEventListener("mousemove", onMouseMoved);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    if (sphere && cloudMesh) {
        sphere.rotation.x = pointer.y * Math.PI * 2;
        sphere.rotation.y = pointer.x * Math.PI * 2;

        cloudMesh.rotation.x = pointer.y * Math.PI * 0.5;
        cloudMesh.rotation.y = pointer.x * Math.PI * 0.5;
    }

    renderer.render(scene, camera);
}

animate();
