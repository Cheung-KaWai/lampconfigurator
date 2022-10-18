import * as THREE from "three";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "/node_modules/three/examples/jsm/controls/TransformControls";
import { ObjectLoader } from "three";
import { spotLight, sunlightInit } from "./light";
import { floor, wall, wood2, metal } from "./room";
import basicRectangle from "../assets/models/tableSize.glb?url";
import leg1 from "../assets/models/legSize.glb?url";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.4.3/");
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

const canvas = document.querySelector("#lamp");
const angles = document.querySelector(".angle");
const temp = document.querySelector(".temp");
const roomLight = document.querySelector("#roomLight");

let dimension = {
  width: window.innerWidth - 500,
  height: window.innerHeight,
};

let scene, camera, renderer, lamp, lampHelper, controls, pane, sunlight, room, dirL;
let targetObject = new THREE.Object3D();

function init() {
  // init scene
  scene = new THREE.Scene();

  scene.add(targetObject);

  // camera
  camera = new THREE.PerspectiveCamera(75, dimension.width / dimension.height, 0.01, 1000);
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

  // lamp
  lamp = new THREE.SpotLight();
  lamp.angle = Math.PI / 12;
  lamp.intensity = 0.04;
  lamp.penumbra = 1;
  lamp.decay = 2;
  lamp.power = 790;
  lamp.position.set(0, 2.5, 0);
  lampHelper = new THREE.SpotLightHelper(lamp);

  // daylight
  sunlight = sunlightInit();
  // dirL = dirLight();
  // const sunlightHelper = new THREE.Amb(sunlight);

  room = floor();

  const transformControl = new TransformControls(camera, renderer.domElement);
  transformControl.addEventListener("dragging-changed", function (event) {
    controls.enabled = !event.value;
    targetObject.position.set(lamp.position.x, 0, lamp.position.z);
    lamp.target = targetObject;
  });
  transformControl.attach(lamp);

  gltfLoader.load(basicRectangle, (glb) => {
    const table = glb.scene;
    const material = new THREE.MeshStandardMaterial(wood2);
    table.traverse((child) => {
      child.material = material;
    });
    table.position.set(0, 0.87, -1.5);
    scene.add(table);
  });

  gltfLoader.load(leg1, (glb) => {
    const leg = glb.scene;
    const material = new THREE.MeshStandardMaterial(metal);
    leg.traverse((child) => {
      child.material = material;
    });
    const leg2 = leg.clone();
    leg.position.set(-0.65, 0.87, -1.5);
    leg2.position.set(0.65, 0.87, -1.5);
    scene.add(leg, leg2);
  });

  scene.add(
    camera,
    lamp,
    lampHelper,
    sunlight,
    room,
    targetObject,
    wall([0, 1.2, -2.1], 0),
    wall([2.1, 1.2, 0], Math.PI / 2),
    wall([-2.1, 1.2, 0], Math.PI / 2),

    transformControl
  );

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
    width: window.innerWidth - 500,
    height: window.innerHeight,
  };

  // update camera
  camera.aspect = dimension.innerWidth / dimension.innerHeight;
  camera.updateProjectionMatrix();

  //update renderer
  renderer.setSize(dimension.width, dimension.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

init();

angles.addEventListener("change", (ev) => {
  lamp.angle = (ev.target.value * Math.PI) / 180;
  lampHelper.update();
});

temp.addEventListener("change", (ev) => {
  if (!isNaN(ev.target.value.split(" ")[0])) {
    lamp.color = new THREE.Color(...ev.target.value.split(" "));
  }
});

roomLight.addEventListener("input", (ev) => {
  sunlight.intensity = ev.target.value;
});

/////////////////////////////////////// DEBUGER //////////////////////////
// pane = new Pane();
// const temp = {
//   temperature: "",
// };

// const lampPane = pane.addFolder({
//   title: "lamp",
// });
// lampPane
//   .addInput(temp, "temperature", {
//     options: {
//       "2700K": [255, 169, 87, 790],
//       "3000K": [255, 180, 107, 822],
//       "4000k": [255, 209, 163, 835],
//     },
//   })
//   .on("change", (ev) => {
//     const color = ev.value.slice(0, -1);
//     const power = ev.value[3];
//     lamp.color = new THREE.Color(...color);
//     // lamp.power = power;
//     // console.log(lamp);
//   });

// lampPane
//   .addInput(lamp, "angle", {
//     options: {
//       "15°": 15,
//       "36°": 36,
//       "60°": 60,
//     },
//   })
//   .on("change", (ev) => {
//     const rad = (ev.value * Math.PI) / 180;
//     lamp.angle = rad;
//     lampHelper.update();
//   });
// lampPane.addInput(lamp, "intensity", { step: 0.001, min: 0.001, max: 0.02 });

// const sunLightPane = pane.addFolder({
//   title: "sun",
// });
// sunLightPane.addInput(sunlight, "intensity", { step: 0.01, min: 0.01, max: 1.5 });
