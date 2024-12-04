// Escena del Cuestionario
const sceneQuiz = new THREE.Scene();
const cameraQuiz = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Crear un cubo con material MeshPhong
const geometryQuiz = new THREE.BoxGeometry();
const materialQuiz = new THREE.MeshPhongMaterial({
    shininess: 1024,
    reflectivity: 0.7,
    specular: 0xffffff,
    color: 0xffa500 // Naranja inicial
});
const cubeQuiz = new THREE.Mesh(geometryQuiz, materialQuiz);
cubeQuiz.position.x += 1;
sceneQuiz.add(cubeQuiz);

// Configurar cámara
cameraQuiz.position.z = 5;

// Añadir iluminación a la escena
const ambientLight = new THREE.AmbientLight(0x404040); // Luz ambiental tenue
sceneQuiz.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Luz direccional
directionalLight.position.set(5, 5, 5).normalize();
sceneQuiz.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0x6495ED, 0xffcc00, 0.5); // Luz hemisférica
sceneQuiz.add(hemisphereLight);

// Crear contenedor para el cuestionario
const quizContainer = document.createElement('div');
quizContainer.style.position = 'absolute';
quizContainer.style.top = '10px';
quizContainer.style.left = '10px';
quizContainer.style.width = '80%';
quizContainer.style.background = 'rgba(255, 255, 255, 0.9)';
quizContainer.style.padding = '10px';
quizContainer.style.borderRadius = '10px';
quizContainer.style.overflowY = 'auto';
quizContainer.style.maxHeight = '70vh';
quizContainer.style.fontSize = '12px'; // Reducir tamaño de fuente
quizContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
quizContainer.innerHTML = `
    <h3 style="text-align: center; margin-top: 0;">Descubre tu color</h3>
    <form id="quiz-form">
        ${generateQuestions()}
        <button type="submit" style="margin-top: 10px;">Calcular Color</button>
    </form>
`;
quizContainer.style.display = 'block';
document.body.appendChild(quizContainer);

// Función para generar las 20 preguntas dinámicamente
function generateQuestions() {
    const questions = [
        { text: "¿Qué tan incómodo te sientes frente a situaciones de peligro físico?", section: "R" },
        { text: "¿Temes al conflicto o a las confrontaciones?", section: "R" },
        { text: "¿Te sientes ansioso/a en situaciones de estrés intenso?", section: "R" },
        { text: "¿Te provoca miedo la violencia o el caos?", section: "R" },
        { text: "¿Evitas riesgos extremos o deportes peligrosos?", section: "R" },
        { text: "¿Te incomoda estar en lugares abarrotados?", section: "R" },
        { text: "¿Qué tan reactivo/a eres ante el peligro inmediato?", section: "R" },
        { text: "¿Te preocupa la incertidumbre en el futuro?", section: "G" },
        { text: "¿Qué tan ansioso/a te pone la inestabilidad económica o laboral?", section: "G" },
        { text: "¿Te sientes inseguro/a al caminar por lugares desconocidos?", section: "G" },
        { text: "¿Te genera ansiedad perderte o no saber cómo llegar a un lugar?", section: "G" },
        { text: "¿Te incomoda la idea de que las cosas cambien inesperadamente?", section: "G" },
        { text: "¿Qué tan importante es la estabilidad en tu vida?", section: "G" },
        { text: "¿Temes perder el control sobre lo que te rodea?", section: "G" },
        { text: "¿Qué tan incómodo/a te hace sentir estar completamente solo/a?", section: "B" },
        { text: "¿Te provoca miedo el silencio absoluto o la oscuridad total?", section: "B" },
        { text: "¿Qué tan introspectivo/a eres cuando tienes miedo?", section: "B" },
        { text: "¿Te preocupan preguntas existenciales como el propósito de la vida?", section: "B" },
        { text: "¿Sientes temor por lo desconocido o lo incierto?", section: "B" },
        { text: "¿Te asusta perderte en tus propios pensamientos o recuerdos?", section: "B" }
    ];

    return questions.map((q, i) => `
        <label>${i + 1}. ${q.text} (1-5)</label>
        <input type="number" name="q${i + 1}" min="1" max="5" required>
    `).join("");
}

// Animar el cuestionario
function animateQuiz() {
    requestAnimationFrame(animateQuiz);
    cubeQuiz.rotation.x += 0.01;
    cubeQuiz.rotation.y += 0.01;
    renderer.render(sceneQuiz, cameraQuiz);
}

// Función para cambiar a la escena del cuestionario
function loadQuizScene() {
    quizContainer.style.display = 'block';
    renderer.setAnimationLoop(() => {
        cubeQuiz.rotation.x += 0.01;
        cubeQuiz.rotation.y += 0.01;
        renderer.render(sceneQuiz, cameraQuiz);
    });
}

// Manejar el cuestionario
document.body.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const answers = Array.from(formData.values()).map(val => parseInt(val, 10));
    const { colorHex, statistics } = calculateColorAndStats(answers);

    materialQuiz.color.set(colorHex);

    alert(`
        ¡Tu color es: #${colorHex.toString(16).padStart(6, '0').toUpperCase()}!
        Estadísticas:
        ${Object.entries(statistics).map(([key, value]) => `${key}: ${value.toFixed(2)}`).join("\n")}
    `);
});

// Calcular color y estadísticas
function calculateColorAndStats(answers) {
    const red = Math.min(255, answers.slice(0, 7).reduce((acc, val) => acc + val * 10, 0));
    const green = Math.min(255, answers.slice(7, 14).reduce((acc, val) => acc + val * 10, 0));
    const blue = Math.min(255, answers.slice(14).reduce((acc, val) => acc + val * 10, 0));
    const colorHex = (red << 16) | (green << 8) | blue;

    const total = red + green + blue;
    const statistics = {
        Fuerza: red / 255 * 100,
        Agilidad: green / 255 * 100,
        Inteligencia: blue / 255 * 100,
        Resistencia: (red + green) / (2 * 255) * 100,
        Percepción: (green + blue) / (2 * 255) * 100,
        Carisma: (red + blue) / (2 * 255) * 100,
        Vitalidad: total / (3 * 255) * 100
    };

    return { colorHex, statistics };
}
