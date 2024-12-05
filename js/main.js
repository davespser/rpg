import { initLobby } from './lobby.js';
import { initCuestionario } from './cuestionario.js';
import { initEscenario1 } from './escenario1.js';

// Configuración inicial
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Controlador de escenas
let currentScene, currentAnimationLoop;

// Función para cambiar escenas
function switchScene(newScene, newAnimationLoop) {
    if (currentAnimationLoop) cancelAnimationFrame(currentAnimationLoop);
    currentScene = newScene;
    currentAnimationLoop = newAnimationLoop;
    newAnimationLoop();
}

// Inicializar el Lobby como escena inicial
initLobby(renderer, camera, switchScene);
