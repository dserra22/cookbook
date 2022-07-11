import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { TorusKnotGeometry } from "three";

let camera, scene, renderer;

let onPointerDownMouseX = 0,
  onPointerDownMouseY = 0,
  lon = 0,
  onPointerDownLon = 0,
  lat = 0,
  onPointerDownLat = 0,
  phi = 0,
  theta = 0,
  cube,
  controls,
  introText,
  rotateText = false,
  firstYPosition = 1,
  secondYPosition = 0.5,
  thirdYPosition = 0.1,
  camPositionX = 10,
  camPositionZ = 40,
  camPositionY = firstYPosition,
  camRatio = camPositionX / camPositionZ,
  rate = 0.0001,
  updateFOV = false;
const tempV = new THREE.Vector3();

function addCube() {
  const geometry = new THREE.BoxGeometry(3.09, 4, 0.01);
  const material = new THREE.MeshBasicMaterial({ color: 0x2b82d4 });
  cube = new THREE.Mesh(geometry, material);
  cube.position.x += 2;
  scene.add(cube);
}

function createFont(text, x, y, z) {
  const loader = new FontLoader();
  loader.load("fonts/daboo2.json", function (font) {
    const geometry = new TextGeometry(text, {
      font: font,
      size: 0.2,
      height: 0.02,
    });
    const textMesh = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ color: 0x5c858f })
    );
    textMesh.position.x = x;
    textMesh.position.y = y;
    textMesh.position.z = z;
    textMesh.rotation.y = camPositionX / camPositionZ;
    introText = textMesh;
    scene.add(textMesh);
  });
}

init();
createScene();
animate();

function createScene() {
  createFont(
    "The High Protein College Mostly Vegan Cookbook",
    5,
    firstYPosition,
    35
  );
  createFont("By Yours Truly", 5, secondYPosition, 29);
  createFont("David Serrano", 3, thirdYPosition, 22);

  // addCube();
}

function init() {
  const container = document.getElementById("container");

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.5,
    1100
  );
  camera.position.set(camPositionX, camPositionY, camPositionZ);
  // camera.position.setZ = 2;

  scene = new THREE.Scene();

  const geometry = new THREE.SphereGeometry(500, 60, 40);
  // invert the geometry on the x-axis so that all of the faces point inward
  geometry.scale(-1, 1, 1);

  const gridHelper = new THREE.GridHelper();
  // scene.add(gridHelper);

  // const texture = new THREE.TextureLoader().load("kitchen.jpg");
  // const material = new THREE.MeshBasicMaterial({ map: texture });

  // const mesh = new THREE.Mesh(geometry, material);
  scene.background = new THREE.Color(0xffebd7);
  scene.background = new THREE.Color(0xfff3e7);
  scene.background = new THREE.Color(0xfff7ef);
  scene.background = new THREE.Color(0xfffbf7);

  // scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);

  container.style.touchAction = "none";
  container.addEventListener("pointerdown", onPointerDown);

  // document.addEventListener("wheel", onDocumentMouseWheel);

  //

  document.addEventListener("dragover", function (event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  });

  document.addEventListener("dragenter", function () {
    document.body.style.opacity = 0.5;
  });

  document.addEventListener("dragleave", function () {
    document.body.style.opacity = 1;
  });

  document.addEventListener("drop", function (event) {
    event.preventDefault();

    const reader = new FileReader();
    reader.addEventListener("load", function (event) {
      material.map.image.src = event.target.result;
      material.map.needsUpdate = true;
    });
    reader.readAsDataURL(event.dataTransfer.files[0]);

    document.body.style.opacity = 1;
  });

  //

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerDown(event) {
  if (event.isPrimary === false) return;

  // isUserInteracting = true;

  onPointerDownMouseX = event.clientX;
  onPointerDownMouseY = event.clientY;

  onPointerDownLon = lon;
  onPointerDownLat = lat;

  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerup", onPointerUp);
}

function onPointerMove(event) {
  if (event.isPrimary === false) return;

  lon = (onPointerDownMouseX - event.clientX) * 0.1 + onPointerDownLon;
  lat = (event.clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat;
}

function onPointerUp() {
  if (event.isPrimary === false) return;

  // isUserInteracting = false;

  document.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("pointerup", onPointerUp);
}

function onDocumentMouseWheel(event) {
  const fov = camera.fov + event.deltaY * 0.05;
  camera.fov = THREE.MathUtils.clamp(fov, 10, 75);

  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);
  update();
}

setTimeout(function () {
  rotateText = true;
}, 400);

function update() {
  lat = Math.max(-85, Math.min(85, lat));
  phi = THREE.MathUtils.degToRad(90 - lat);
  theta = THREE.MathUtils.degToRad(lon);

  camera.position.set(camPositionX, camPositionY, camPositionZ);

  if (camPositionZ < 35 && camPositionY > secondYPosition) {
    camPositionY -= 0.003;
  }
  if (camPositionZ < 29 && camPositionY > thirdYPosition) {
    camPositionY -= 0.002;
  } else {
    // camPositionY = thirdYPosition;
  }

  if (camPositionZ < 35) {
  }
  if (camPositionX > 0) {
    camPositionX = camPositionX - rate * 1.3;
  } else {
    camPositionX = 0;
  }
  if (camPositionZ > 4) {
    camPositionZ = camPositionZ - rate * 4;
  } else {
    camPositionZ = 4;

    if (camera.fov >= 66) {
      camera.fov = camera.fov -= 0.05;
      camera.updateProjectionMatrix();
    } else {
      if (updateFOV == false) {
        document.querySelector(".main-scene").classList.toggle("show-scene");
        updateFOV = true;
      } else {
        // const pos = cube.getWorldPosition(tempV);
        // console.log(pos);
        // tempV.project(camera);
        // // convert the normalized position to CSS coordinates
        // console.log(tempV.x);
        // console.log(window.clientWidth);
        // const x = tempV.x * window.innerWidth;
        // const y = tempV.y * window.innerHeight;
        // // move the elem to that position
        // const book = document.querySelector(".book-box");
        // book.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
      }
    }
  }

  rate += Math.pow(1.1, rate) * 0.00001;
  // rate += Math.pow(1.1, rate) * 0.1;

  const x = 500 * Math.sin(phi) * Math.cos(theta);
  const y = 500 * Math.cos(phi);
  const z = 500 * Math.sin(phi) * Math.sin(theta);

  camera.lookAt(x, y, z);
  controls.update();

  renderer.render(scene, camera);
}
