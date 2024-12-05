
const scene1 = new THREE.Scene();

// Crear la cámara
const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera1.position.z = 5;

// Crear el renderizador
const renderer1 = new THREE.WebGLRenderer({ antialias: true });
renderer1.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer1.domElement);

// Añadir una luz a la escena
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 1).normalize();
scene1.add(light);

// Añadir un cubo a la escena
const geometry1 = new THREE.BoxGeometry();
const material1 = new THREE.MeshPhongMaterial({ color: 0x007BFF });
const cube1 = new THREE.Mesh(geometry1, material1);
scene1.add(cube1);
function loadescenario1() {
    scene1Container.style.display = 'block';
    renderer.setAnimationLoop(() => {
        cube1.rotation.x += 0.01;
        cube1.rotation.y += 0.01;
        renderer.render(scene1, camera1);
    });
}
function animateScene1() {
    requestAnimationFrame(animateScene1);
    cube1.rotation.x += 0.01;
    cube1.rotation.y += 0.01;
    renderer1.render(scene1, camera1);
}

// Llamar a la función de animación
animateScene1();

// Manejar el redimensionamiento de la ventana
window.addEventListener('resize', () => {
    camera1.aspect = window.innerWidth / window.innerHeight;
    camera1.updateProjectionMatrix();
    renderer1.setSize(window.innerWidth, window.innerHeight);
});

// Añadir el reloj
const clock = document.createElement('div');
clock.id = 'clock';
clock.style.position = 'absolute';
clock.style.bottom = '10px';
clock.style.right = '10px';
clock.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
clock.style.color = 'white';
clock.style.padding = '10px';
clock.style.borderRadius = '5px';
clock.style.fontFamily = 'Arial, sans-serif';
clock.style.zIndex = '100'; // Asegura que esté encima del canvas
document.body.appendChild(clock);

// Actualizar el reloj
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock();// Actualizar inmediatamente al cargar la página
}
