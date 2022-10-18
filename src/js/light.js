import * as THREE from "three";

export const spotLight = (color, intensity, distance, angle, penumbra, decay) => {
  let spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
  return spotLight;
};

export const sunlightInit = () => {
  const light = new THREE.PointLight(0xffffff, 5, 100, 2);
  light.position.set(0, 5, 0);
  return light;
};
export const dirLight = () => {
  const light = new THREE.DirectionalLight(0xffffff, 0.2);
  return light;
};
