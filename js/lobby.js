import * as THREE from 'three';
import { initCuestionario } from './cuestionario.js';
import { initEscenario1 } from './escenario1.js';

export function initLobby(renderer, camera, switchScene) {
    const sceneLobby = new THREE.Scene();

    // Fondo de la escena
    const loader = new THREE.TextureLoader();
    loader.load('./assets/images/roman.jpg'), texture => {
        sceneLobby.background = texture;
    });

    // Cubo animado
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x007BFF });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.z = -10;
    sceneLobby.add(cube);

    // Crear botones del lobby
    const lobbyContainer = document.createElement('div');
    lobbyContainer.style = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        font-family: Arial, sans-serif;
        z-index: 10;
    `;
    lobbyContainer.innerHTML = `
        <h1>Bienvenido al RPG de Colores</h1>
        <div>
            <button id="start-game-button">Empezar Juego</button>
            <button id="options-button">Opciones</button>
        </div>
    `;
    document.body.appendChild(lobbyContainer);

    // Manejar eventos de los botones
    document.getElementById('start-game-button').addEventListener('click', () => {
        lobbyContainer.style.display = 'none'; // Ocultar el Lobby
        initCuestionario(renderer, camera, switchScene); // Cargar Cuestionario
    });

    document.getElementById('options-button').addEventListener('click', () => {
        lobbyContainer.style.display = 'none'; // Ocultar el Lobby
        initEscenario1(renderer, camera, switchScene); // Cargar Escenario 1
    });

    // Animar el lobby
    function animateLobby() {
        currentAnimationLoop = requestAnimationFrame(animateLobby);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(sceneLobby, camera);
    }

    // Establecer la escena inicial
    switchScene(sceneLobby, animateLobby);
}
