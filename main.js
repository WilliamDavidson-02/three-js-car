import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let scene, camera, renderer;

scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  5000
);
camera.rotation.y = (45 / 180) * Math.PI;
camera.position.x = 800;
camera.position.y = 100;
camera.position.z = 1000;

const hlight = new THREE.AmbientLight(0x404040, 100);
scene.add(hlight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 100);
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

const pointLight1 = new THREE.PointLight(0xc4c4c4, 10);
pointLight1.position.set(0, 300, 500);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xc4c4c4, 10);
pointLight2.position.set(500, 100, 0);
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0xc4c4c4, 10);
pointLight3.position.set(0, 100, -500);
scene.add(pointLight3);

const pointLight4 = new THREE.PointLight(0xc4c4c4, 10);
pointLight4.position.set(-500, 300, 0);
scene.add(pointLight4);

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = 0;
controls.autoRotate = true;

let loader = new GLTFLoader();
loader.load("scene.gltf", (gltf) => {
  const car = gltf.scene.children[0];
  car.scale.set(0.5, 0.5, 0.5, 0.5);

  scene.add(gltf.scene);
  animate();
});

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
