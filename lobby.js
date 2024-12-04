// Escena de Lobby
const sceneLobby = new THREE.Scene();
const cameraLobby = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
document.body.appendChild(renderer.domElement);

// Fondo CSS
document.body.style.backgroundImage = "url('roman.jpg')"; // Cambia a una imagen válida
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";
document.body.style.margin = "0";
document.body.style.overflow = "hidden"; // Evitar scroll

// Crear cubo
const geometryLobby = new THREE.BoxGeometry();
const materialLobby = new THREE.MeshBasicMaterial({ color: 0x007BFF });
const cubeLobby = new THREE.Mesh(geometryLobby, materialLobby);
sceneLobby.add(cubeLobby);

cameraLobby.position.z = 5;

// Texto de instrucciones
const lobbyContainer = document.createElement('div');
lobbyContainer.style.position = 'absolute';
lobbyContainer.style.top = '50%';
lobbyContainer.style.left = '50%';
lobbyContainer.style.transform = 'translate(-50%, -50%)';
lobbyContainer.style.textAlign = 'center';
lobbyContainer.style.color = 'white'; // Asegura que sea visible
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
    lobbyContainer.style.display = 'none'; // Ocultar lobby
    alert("Cargando escena del cuestionario..."); // Reemplazar con la función loadQuizScene();
});

document.getElementById('options-button').addEventListener('click', () => {
    alert("Opciones: Aún no implementado.");
});
