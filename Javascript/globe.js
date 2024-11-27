import * as THREE from "three";

// Create scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(30);

// Create renderer with transparent background
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
    alpha: true  // Enable transparency
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth / 3.5, window.innerHeight / 3.5);

// Set the clear color to transparent (alpha = 0)
renderer.setClearColor(0x000000, 0);  // 0x000000 is black, and 0 alpha is fully transparent

// Add ambient light
const ambientLight = new THREE.AmbientLight(0x9cd5fa);
scene.add(ambientLight);

// Load textures
const uvTexture = new THREE.TextureLoader().load("../Images/8k_earth_daymap.jpeg");      // Earth diffuse texture
const normalMap = new THREE.TextureLoader().load("../Images/8k_earth_normal_map_(0-00-00-00).jpg");  // Earth normal map
const specularMap = new THREE.TextureLoader().load("../Images/8k_earth_specular_map.png");   // Earth specular map
const cloudTexture = new THREE.TextureLoader().load("../Images/8k_earth_clouds.jpeg");      // Cloud texture

// Earth material with normal map and specular map
const material = new THREE.MeshStandardMaterial({
    map: uvTexture,        // Diffuse map (Earth's surface)
    normalMap: normalMap,  // Normal map for surface detail
    normalScale: new THREE.Vector2(1, 4),  // Normal map strength
    specularMap: specularMap, // Specular map for reflections
});

// Cloud material with transparency
const cloudMaterial = new THREE.MeshBasicMaterial({
    map: cloudTexture,        // Cloud texture
    transparent: true,        // Make clouds transparent
    opacity: 0.081,           // Adjust the cloud opacity to make them more subtle
});

// Create geometry for Earth and Clouds
const sphereGeometry = new THREE.SphereGeometry(15, 64, 32); // Earth geometry
const cloudGeometry = new THREE.SphereGeometry(15.2, 64, 32); // Cloud sphere (slightly larger)

// Create Earth and Cloud meshes
const sphere = new THREE.Mesh(sphereGeometry, material);
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);

// Add both Earth and Cloud meshes to the scene
scene.add(sphere);
scene.add(cloudMesh);

// Pointer to track mouse position
const pointer = new THREE.Vector2();

// Mouse move event handler
const onMouseMove = (event) => {
    // Normalize the mouse position to the range [-1, 1]
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (event.clientY / window.innerHeight) * 2 + 1;
};

// Add event listener for mouse movement
window.addEventListener('mousemove', onMouseMove);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Directly control the rotation of the Earth and clouds based on the mouse position
    sphere.rotation.x = pointer.y * Math.PI * 2; // Directly set the x rotation based on pointer.y
    sphere.rotation.y = pointer.x * Math.PI * 2; // Directly set the y rotation based on pointer.x

    cloudMesh.rotation.x = pointer.y * Math.PI * 0.5; // Clouds rotate based on pointer.y (slightly slower)
    cloudMesh.rotation.y = pointer.x * Math.PI * 0.5; // Clouds rotate based on pointer.x (slightly slower)

    // Render the scene with transparent background
    renderer.render(scene, camera);
}

animate();
