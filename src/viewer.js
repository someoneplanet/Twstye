import { loadOBJWithMTL, loadOBJFromText } from './objLoader.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Camera position
camera.position.z = 5;

// OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;

// Responsive resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// File handling
let objFile = null;
let mtlFile = null;

document.getElementById('objInput').addEventListener('change', (event) => {
    objFile = event.target.files[0];
});

document.getElementById('mtlInput').addEventListener('change', (event) => {
    mtlFile = event.target.files[0];
});

document.getElementById('loadBtn').addEventListener('click', () => {
    if (objFile && mtlFile) {
        const objURL = URL.createObjectURL(objFile);
        const mtlURL = URL.createObjectURL(mtlFile);
        loadOBJWithMTL(objURL, mtlURL, scene);
    } else {
        alert('Please select both OBJ and MTL files.');
    }
});

// Text input handling
document.getElementById('loadTextBtn').addEventListener('click', () => {
    const objText = document.getElementById('objTextInput').value;
    if (objText.trim()) {
        loadOBJFromText(objText, scene);
    } else {
        alert('Please paste valid OBJ text.');
    }
});

// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
