// Escena del Lobby
const sceneLobby = new THREE.Scene();
const cameraLobby = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cargar la textura de la imagen de fondo
const textureLoader = new THREE.TextureLoader();
const backgroundTexture = textureLoader.load('roman.jpg');

// Crear el plano de fondo
const planeGeometry = new THREE.PlaneGeometry(20, 10); // Ajusta el tamaño según sea necesario
const planeMaterial = new THREE.MeshBasicMaterial({ map: backgroundTexture });
const backgroundPlane = new THREE.Mesh(planeGeometry, planeMaterial);
backgroundPlane.position.z = -5; // Ajusta la posición en profundidad
sceneLobby.add(backgroundPlane);

// Crear el cubo de la escena del lobby
const geometryLobby = new THREE.BoxGeometry();
const materialLobby = new THREE.MeshBasicMaterial({ color: 0x007BFF });
const cubeLobby = new THREE.Mesh(geometryLobby, materialLobby);
sceneLobby.add(cubeLobby);

cameraLobby.position.z = 5;

// Mostrar texto de instrucciones (canvas 2D sobre la escena 3D)
const lobbyContainer = document.createElement('div');
// ... (resto del código para mostrar el texto de instrucciones)

// Animar el lobby
function animateLobby() {
    requestAnimationFrame(animateLobby);
    cubeLobby.rotation.x += 0.01;
    cubeLobby.rotation.y += 0.01;
    renderer.render(sceneLobby, cameraLobby);
}
animateLobby();

// Manejar eventos de los botones
// ... (resto del código para manejar los botones)
