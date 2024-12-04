// Escena del Lobby
const sceneLobby = new THREE.Scene();
const cameraLobby = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const loader = new THREE.TextureLoader();
loader.load('./roman.jpg', function (texture) {
    sceneLobby.background = texture;
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
document.body.appendChild(renderer.domElement);

// Fondo del lobby con la imagen "roman.jpg"
document.body.style.margin = "0"; // Elimina márgenes
document.body.style.overflow = "hidden"; // Evita scroll
document.body.style.backgroundImage = "url('./roman.jpg')"; // Ruta de la imagen
document.body.style.backgroundSize = "cover"; // Que la imagen cubra todo el fondo
document.body.style.backgroundPosition = "center"; // Centrado

// Crear el cubo de la escena del lobby
const geometryLobby = new THREE.BoxGeometry();
const materialLobby = new THREE.MeshBasicMaterial({ color: 0x007BFF });
const cubeLobby = new THREE.Mesh(geometryLobby, materialLobby);
cubeLobby.position.y = -6;
cubeLobby.position.z = -10;
sceneLobby.add(cubeLobby);

cameraLobby.position.z = 5;

// Mostrar texto de instrucciones (canvas 2D sobre la escena 3D)
const lobbyContainer = document.createElement('div');
lobbyContainer.style.position = 'absolute';
lobbyContainer.style.top = '2';
lobbyContainer.style.left = '50';
lobbyContainer.style.width = '100%';
lobbyContainer.style.height = '100%';
lobbyContainer.style.display = 'flex';
lobbyContainer.style.flexDirection = 'column';
lobbyContainer.style.justifyContent = 'flex-start';
lobbyContainer.style.alignItems = 'center';
lobbyContainer.style.textAlign = 'center';
lobbyContainer.style.color = 'white'; // Texto visible sobre el fondo
lobbyContainer.style.fontFamily = 'Arial, sans-serif'; // Fuente legible
lobbyContainer.style.zIndex = '10'; // Asegura que esté sobre el canvas
lobbyContainer.innerHTML = `
    <h1 style="margin-top: 20px;">Bienvenido al RPG de Colores</h1>
    <div style="position: absolute; bottom: 10px; display: flex; justify-content: center; width: 100%;">
        <button id="start-game-button" style="margin: 5px; padding: 10px 20px; font-size: 12px;">Empezar Juego</button>
        <button id="options-button" style="margin: 5px; padding: 10px 20px; font-size: 12px;">Opciones</button>`;
document.body.appendChild(lobbyContainer);

// Animar el lobby
function animateLobby() {
    requestAnimationFrame(animateLobby);
    cubeLobby.rotation.x += 0.01;
    cubeLobby.rotation.y += 0.01;
    renderer.render(sceneLobby, cameraLobby);
}
animateLobby();

// Manejar eventos de los botones
document.getElementById('start-game-button').addEventListener('click', () => {
    lobbyContainer.style.display = 'none'; // Ocultar lobby
    loadQuizScene();
});

document.getElementById('options-button').addEventListener('click', () => {
    loadEscenario1();
});

function loadEscenario1() {
    // Eliminar el renderizador del lobby (si es necesario)
    renderer.dispose();

    // Cargar la nueva escena
    import('./newScene.js').then(module => {
        module.initScene(); // Ejecutar la función initScene para inicializar la nueva escena
    }).catch(err => {
        console.error('Error al cargar la nueva escena:', err);
    });
}
