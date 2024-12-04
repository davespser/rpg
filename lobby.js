// Escena del Lobby
const sceneLobby = new THREE.Scene();
const cameraLobby = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear el cubo de la escena del lobby
const geometryLobby = new THREE.BoxGeometry();
const materialLobby = new THREE.MeshBasicMaterial({ color: 0x007BFF });
const cubeLobby = new THREE.Mesh(geometryLobby, materialLobby);
sceneLobby.add(cubeLobby);

cameraLobby.position.z = 5;

// Añadir imagen de fondo usando CSS
document.body.style.backgroundImage = "url('roman.jpg')"; // Ruta a tu imagen
document.body.style.backgroundSize = "cover"; // Para que cubra todo el fondo
document.body.style.backgroundPosition = "center"; // Centrado
document.body.style.margin = "0";
document.body.style.overflow = "hidden"; // Evitar scroll

// Mostrar texto de instrucciones (canvas 2D sobre la escena 3D)
const lobbyContainer = document.createElement('div');
lobbyContainer.style.position = 'absolute';
lobbyContainer.style.top = '50%';
lobbyContainer.style.left = '50%';
lobbyContainer.style.transform = 'translate(-50%, -50%)';
lobbyContainer.style.textAlign = 'center';
lobbyContainer.innerHTML = `
    <h1>Bienvenido al RPG de Colores</h1>
    <button id="start-game-button">Empezar Juego</button>
    <button id="options-button">Opciones</button>
`;
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
    // Cambiar a la escena del cuestionario
    lobbyContainer.style.display = 'none';
    loadQuizScene();
});

document.getElementById('options-button').addEventListener('click', () => {
    alert("Opciones: Aún no implementado.");
});
