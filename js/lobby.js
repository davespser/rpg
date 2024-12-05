// Crear escena del Lobby
const sceneLobby = new THREE.Scene();
const cameraLobby = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Cargar fondo de la escena
const loader = new THREE.TextureLoader();
loader.load('./assets/images/roman.jpg', function (texture) {
    sceneLobby.background = texture;
});

// Configurar renderizador
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear cubo animado
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x007BFF });
const cube = new THREE.Mesh(geometry, material);
cube.position.z = -10;
sceneLobby.add(cube);

// Animar el Lobby
function animateLobby() {
    requestAnimationFrame(animateLobby);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(sceneLobby, cameraLobby);
}
animateLobby();

// Manejar botones
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
    z-index: 10;
    color: white;
    font-family: Arial, sans-serif;
`;
lobbyContainer.innerHTML = `
    <h1>Bienvenido al RPG de Colores</h1>
    <div>
        <button id="start-game-button">Empezar Juego</button>
        <button id="options-button">Opciones</button>
    </div>
`;
document.body.appendChild(lobbyContainer);

// Eventos de los botones
document.getElementById('start-game-button').addEventListener('click', () => {
    lobbyContainer.style.display = 'none'; // Ocultar Lobby
    loadCuestionario(); // Cargar Cuestionario
});

document.getElementById('options-button').addEventListener('click', () => {
    lobbyContainer.style.display = 'none'; // Ocultar Lobby
    loadEscenario1(); // Cargar Escenario 1
});

// Cargar Cuestionario
function loadCuestionario() {
    const script = document.createElement('script');
    script.src = './js/cuestionario.js';
    document.body.appendChild(script);
}

// Cargar Escenario 1
function loadEscenario1() {
    const script = document.createElement('script');
    script.src = './js/escenario1.js';
    document.body.appendChild(script);
}
