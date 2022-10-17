import * as THREE from "three";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls";
import { spotLight } from "./light";

let canvas = document.querySelector("#lamp");
let dimension = {
  width: window.innerWidth,
  height: window.innerHeight,
};

let scene, camera, renderer, light, controls;

function init() {
  // init scene
  scene = new THREE.Scene();

  // camera
  camera = new THREE.PerspectiveCamera(75, dimension.width / dimension.height, 0.01, 100);
  camera.position.set(0, 1, 2);

  // orbit
  controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  // renderer
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(dimension.width, dimension.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.physicallyCorrectLights = true;
  renderer.outputEncoding = THREE.sRGBEncoding;

  // spotlight
  light = spotLight("#fff", 1, 0, Math.PI / 4, 0, 1);
  light.position.set(0, 2, 1);
  const spotLightHelper = new THREE.SpotLightHelper(light);
  scene.add(spotLightHelper);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);

  scene.add(camera, cube, light, spotLightHelper);

  window.addEventListener("resize", onWindowResize);
  animate();
}

function animate() {
  renderer.render(scene, camera);
  controls.update();
  window.requestAnimationFrame(animate);
}

function onWindowResize() {
  //update dimensions
  dimension = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // update camera
  camera.aspect = dimension.innerWidth / dimension.innerHeight;
  camera.updateProjectionMatrix();

  //update renderer
  renderer.setSize(dimensions.width, dimensions.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

init();
