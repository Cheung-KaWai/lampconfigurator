import * as THREE from "three";

export const spotLight = (color, intensity, distance, angle, penumbra, decay) => {
  const spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
  return spotLight;
};
