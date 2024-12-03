import * as THREE from 'three';
export function loadQuizScene() {
    // Código para configurar la escena de cuestionario
}
// Configuración de la escena
const sceneQuiz = new THREE.Scene();
const cameraQuiz = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Añadir luz hemisférica
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1); // Cielo, suelo, intensidad
hemiLight.position.set(0, 20, 0);
sceneQuiz.add(hemiLight);

// Crear un cubo metálico
const geometryQuiz = new THREE.BoxGeometry();
const metallicMaterial = new THREE.MeshStandardMaterial({
    color: 0xFF5722, // Color inicial
    metalness: 0.8,
    roughness: 0.2,
});
const cubeQuiz = new THREE.Mesh(geometryQuiz, metallicMaterial);
sceneQuiz.add(cubeQuiz);
cameraQuiz.position.z = 5;

// Crear el panel de estadísticas (HTML)
const statsContainer = document.createElement('div');
statsContainer.style.position = 'absolute';
statsContainer.style.top = '10px';
statsContainer.style.right = '10px';
statsContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
statsContainer.style.padding = '10px';
statsContainer.style.borderRadius = '5px';
statsContainer.style.fontFamily = 'Arial, sans-serif';
statsContainer.style.fontSize = '14px';
statsContainer.style.maxWidth = '200px';
statsContainer.innerHTML = `<h4>Estadísticas</h4><div id="stats-content">Cargando...</div>`;
document.body.appendChild(statsContainer);

// Animación del cubo
function animateQuiz() {
    requestAnimationFrame(animateQuiz);
    cubeQuiz.rotation.x += 0.01;
    cubeQuiz.rotation.y += 0.01;
    renderer.render(sceneQuiz, cameraQuiz);
}
animateQuiz();

// Preguntas del cuestionario y sistema de estadísticas
const questions = [
    // Rojo (R)
    "¿Qué tan incómodo te sientes frente a situaciones de peligro físico?",
    "¿Temes al conflicto o a las confrontaciones?",
    "¿Te sientes ansioso/a en situaciones de estrés intenso?",
    "¿Te provoca miedo la violencia o el caos?",
    "¿Evitas riesgos extremos o deportes peligrosos?",
    "¿Te incomoda estar en lugares abarrotados?",
    "¿Qué tan reactivo/a eres ante el peligro inmediato?",
    // Verde (G)
    "¿Te preocupa la incertidumbre en el futuro?",
    "¿Qué tan ansioso/a te pone la inestabilidad económica o laboral?",
    "¿Te sientes inseguro/a al caminar por lugares desconocidos?",
    "¿Te genera ansiedad perderte o no saber cómo llegar a un lugar?",
    "¿Te incomoda la idea de que las cosas cambien inesperadamente?",
    "¿Qué tan importante es la estabilidad en tu vida?",
    "¿Temes perder el control sobre lo que te rodea?",
    // Azul (B)
    "¿Qué tan incómodo/a te hace sentir estar completamente solo/a?",
    "¿Te provoca miedo el silencio absoluto o la oscuridad total?",
    "¿Qué tan introspectivo/a eres cuando tienes miedo?",
    "¿Te preocupan preguntas existenciales como el propósito de la vida?",
    "¿Sientes temor por lo desconocido o lo incierto?",
    "¿Te asusta perderte en tus propios pensamientos o recuerdos?",
    "¿Qué tan conectado/a estás con la idea de infinito o vacío?",
];

// Crear el formulario dinámicamente
const formContainer = document.createElement('div');
formContainer.style.position = 'absolute';
formContainer.style.top = '50px';
formContainer.style.left = '10px';
formContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
formContainer.style.padding = '20px';
formContainer.style.borderRadius = '10px';
formContainer.style.maxWidth = '300px';
formContainer.style.maxHeight = '90vh';
formContainer.style.overflowY = 'auto';
formContainer.style.fontFamily = 'Arial, sans-serif';
formContainer.style.fontSize = '14px';

const form = document.createElement('form');
form.innerHTML = `<h3>Cuestionario</h3>`;
questions.forEach((question, index) => {
    const label = document.createElement('label');
    label.textContent = `${index + 1}. ${question} (1-5)`;
    const input = document.createElement('input');
    input.type = 'number';
    input.name = `q${index + 1}`;
    input.min = '1';
    input.max = '5';
    input.required = true;
    input.style.marginBottom = '10px';
    input.style.display = 'block';
    form.appendChild(label);
    form.appendChild(input);
});
const submitButton = document.createElement('button');
submitButton.textContent = 'Calcular estadísticas';
submitButton.type = 'submit';
submitButton.style.marginTop = '20px';
form.appendChild(submitButton);
formContainer.appendChild(form);
document.body.appendChild(formContainer);

// Procesar las respuestas del formulario
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtener respuestas
    const formData = new FormData(form);
    const answers = Array.from(formData.values()).map(value => parseInt(value, 10));

    // Calcular valores RGB
    const red = Math.min(255, answers.slice(0, 7).reduce((acc, val) => acc + val * 10, 0)); // Preguntas 1-7
    const green = Math.min(255, answers.slice(7, 14).reduce((acc, val) => acc + val * 10, 0)); // Preguntas 8-14
    const blue = Math.min(255, answers.slice(14).reduce((acc, val) => acc + val * 10, 0)); // Preguntas 15-21

    // Convertir RGB a color hexadecimal
    const colorHex = (red << 16) | (green << 8) | blue;

    // Actualizar color del cubo
    metallicMaterial.color.set(colorHex);

    // Calcular estadísticas
    const attributes = {
        Fuerza: red * 0.3,
        Velocidad: green * 0.2,
        Resistencia: blue * 0.25,
        Agilidad: red * 0.15,
        Inteligencia: green * 0.35,
        Carisma: blue * 0.1,
        Perseverancia: red * 0.2,
        Sabiduría: green * 0.3,
        Suerte: blue * 0.15,
        // Añadir más estadísticas si es necesario
    };

    // Actualizar el contenido del panel de estadísticas
    const statsContent = document.getElementById('stats-content');
    statsContent.innerHTML = Object.entries(attributes)
        .map(([key, value]) => `<p><strong>${key}:</strong> ${value.toFixed(2)}</p>`)
        .join('');
});
