// Escena del Lobby
const sceneLobby = new THREE.Scene();
const cameraLobby = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
document.body.appendChild(renderer.domElement);

// Fondo del lobby con la imagen "roman.jpg"
document.body.style.margin = "0"; // Elimina márgenes
document.body.style.overflow = "hidden"; // Evita scroll
document.body.style.backgroundImage = "url('/roman.jpg')"; // Ruta de la imagen
document.body.style.backgroundSize = "cover"; // Que la imagen cubra todo el fondo
document.body.style.backgroundPosition = "center"; // Centrado

// Crear el cubo de la escena del lobby
const geometryLobby = new THREE.BoxGeometry();
const materialLobby = new THREE.MeshBasicMaterial({ color: 0x007BFF });
const cubeLobby = new THREE.Mesh(geometryLobby, materialLobby);
sceneLobby.add(cubeLobby);

cameraLobby.position.z = 5;

// Mostrar texto de instrucciones (canvas 2D sobre la escena 3D)
const lobbyContainer = document.createElement('div');
lobbyContainer.style.position = 'absolute';
lobbyContainer.style.top = '50%';
lobbyContainer.style.left = '50%';
lobbyContainer.style.transform = 'translate(-50%, -50%)';
lobbyContainer.style.textAlign = 'center';
lobbyContainer.style.color = 'white'; // Texto visible sobre el fondo
lobbyContainer.style.fontFamily = 'Arial, sans-serif'; // Fuente legible
lobbyContainer.style.zIndex = '10'; // Asegura que esté sobre el canvas
lobbyContainer.innerHTML = `
    <h1>Bienvenido al RPG de Colores</h1>
    <button id="start-game-button" style="margin: 5px; padding: 10px 20px; font-size: 16px;">Empezar Juego</button>
    <button id="options-button" style="margin: 5px; padding: 10px 20px; font-size: 16px;">Opciones</button>
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
    lobbyContainer.style.display = 'none'; // Ocultar lobby
    loadQuizScene();
});

document.getElementById('options-button').addEventListener('click', () => {
    alert("Opciones: Aún no implementado.");
});
