import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

const tableColorTextureWood2 = textureLoader.load("/src/assets/textures/Wood051_1K_Color.jpg");
const tableRoughnessTextureWood2 = textureLoader.load("/src/assets/textures/Wood051_1K_Roughness.jpg");
const tableNormalTextureWood2 = textureLoader.load("/src/assets/textures/Wood051_1K_NormalDx.jpg");

const metalColorTexture = textureLoader.load("/src/assets/textures/Metal009_1K_Color.jpg");
const metalRoughness = textureLoader.load("/src/assets/textures/Metal009_1K_Roughness.jpg");
const normalMap = textureLoader.load("/src/assets/textures/Metal009_1K_NormalDX.jpg");
const metallicMap = textureLoader.load("/src/assets/textures/Metal009_1K_Metalness.jpg");

export const metal = {
  map: metalColorTexture,
  roughness: 0,
  metalnessMap: metallicMap,
  metalness: 1,
  // envMap: environmentMapTexture,
  // envMapIntensity: 0.3,
  normalMap: normalMap,
  roughnessMap: metalRoughness,
};

export const wood2 = {
  map: tableColorTextureWood2,
  roughnessMap: tableRoughnessTextureWood2,
  roughness: 1,
  normalMap: tableNormalTextureWood2,
};

transformTexture([
  tableColorTextureWood2,
  tableRoughnessTextureWood2,
  tableNormalTextureWood2,
  metalColorTexture,
  metalRoughness,
  normalMap,
  metallicMap,
]);

function transformTexture(textures) {
  textures.map((texture) => {
    texture.repeat.y = 1;
    texture.repeat.x = 1;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.encoding = THREE.sRGBEncoding;
  });
}

export const floor = () => {
  const geometry = new THREE.BoxGeometry(4, 0.2, 4);
  const material = new THREE.MeshStandardMaterial({ color: "#fff" });
  const floorObj = new THREE.Mesh(geometry, material);
  return floorObj;
};

export const wall = (position, rotation) => {
  const geometry = new THREE.BoxGeometry(4, 2.6, 0.2);
  const material = new THREE.MeshStandardMaterial({ color: "#fff" });
  const wall = new THREE.Mesh(geometry, material);
  wall.position.set(...position);
  wall.rotateY(rotation);
  return wall;
};
