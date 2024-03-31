import {
  AxesHelper,
  BufferGeometry,
  Clock,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  MathUtils,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  SphereGeometry,
  TextureLoader,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./style.css";

const textUreLoader = new TextureLoader();
const circleTexture = textUreLoader.load("/react.png");
//creation dune scene
const scene = new Scene();
const count = 100;
const distance = 3;
//creation de notre 1e element
scene.add(new AxesHelper());
//craetion de la camera
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
);

camera.position.z = 2;
camera.position.y = 0.5;
camera.position.x = 0.5;
scene.add(camera);

const points = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);
for (let i = 0; i < points.length; i++) {
  points[i] = MathUtils.randFloatSpread(distance * 2);
  colors[i] = Math.random();
}
//creation dune form geometri
const Geometry = new BufferGeometry();
Geometry.setAttribute("position", new Float32BufferAttribute(points, 3));
Geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
const pointMaterial = new PointsMaterial({
  size: 0.1,
  map: circleTexture,
  alphaTest: 0.01,
  transparent: true,
});
const pointsObject = new Points(Geometry, pointMaterial);
scene.add(pointsObject);

const group = new Group();
group.add(pointsObject);
scene.add(group);
const lineMaterial = new LineBasicMaterial({
  color: 0x000000,
  opacity: 0.005,
  depthTest: false,
});

//creation du rendu
const renderer = new WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setClearColor(0x000000, 0);
//DEFINITION DE TAILLE
renderer.setSize(window.innerHeight, window.innerWidth);
//definition du pixel ratio qui permet de gerer les type decrant
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//l
const element = document.body.appendChild(renderer.domElement);
console.log(element);
renderer.render(scene, camera);
//---------------------------------------
const constrols = new OrbitControls(camera, renderer.domElement);
//permet de faire un rendu en permanece
const clock = new Clock();

let mouseX = 0;
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
});
const tick = () => {
  const time = clock.getElapsedTime();
  renderer.render(scene, camera);
  constrols.update();
  requestAnimationFrame(tick);

  const ratio = (mouseX / window.innerWidth - 0.5) * 2;
  group.rotation.y = ratio * Math.PI * 0.1;
};
tick();

//geation du  responsive
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
