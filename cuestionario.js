// Escena del Cuestionario
const sceneQuiz = new THREE.Scene();
const cameraQuiz = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5); // Cielo, suelo, intensidad
hemiLight.position.set(0, 20, 0);
sceneQuiz.add(hemiLight);
// Crear un cubo diferente para la escena del cuestionario
const geometryQuiz = new THREE.BoxGeometry();
const materialQuiz = new THREE.MeshStandardMaterial({ color: 0xFF5722, metalness: 2,
    roughness: 0.2,}); // Color inicial: naranja
const cubeQuiz = new THREE.Mesh(geometryQuiz, materialQuiz);
sceneQuiz.add(cubeQuiz);

cameraQuiz.position.z = 5;

// Contenedor del cuestionario
const quizContainer = document.createElement('div');
quizContainer.style.position = 'absolute';
quizContainer.style.top = '5%';
quizContainer.style.left = '5%';
quizContainer.style.background = 'rgba(255, 255, 255, 0.9)';
quizContainer.style.padding = '20px';
quizContainer.style.borderRadius = '10px';
quizContainer.style.overflowY = 'auto';
quizContainer.style.maxHeight = '60vh';
quizContainer.innerHTML = `
    <h3>Descubre tu color</h3>
    <form id="quiz-form">
        ${generateQuestions()}
        <button type="submit">Calcular Color</button>
    </form>
`;
quizContainer.style.display = 'none';
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

// Función para cambiar de escena al cuestionario
function loadQuizScene() {
    // Mostrar el cuestionario
    quizContainer.style.display = 'block';

    // Cambiar a la escena del cuestionario
    renderer.setAnimationLoop(() => {
        cubeQuiz.rotation.y += 0.01;
        renderer.render(sceneQuiz, cameraQuiz);
    });
}

// Manejar el cuestionario
document.body.addEventListener('submit', (event) => {
    event.preventDefault();

    // Procesar las respuestas
    const formData = new FormData(event.target);
    const answers = Array.from(formData.values()).map(val => parseInt(val, 10));
    const { colorHex, statistics } = calculateColorAndStats(answers);

    // Actualizar el color del cubo en la escena del cuestionario
    materialQuiz.color.set(colorHex);

    alert(`
        ¡Tu color es: #${colorHex.toString(16).padStart(6, '0').toUpperCase()}!
        Estadísticas:
        ${Object.entries(statistics).map(([key, value]) => `${key}: ${value.toFixed(2)}`).join("\n")}
    `);
});

// Calcular el color y las estadísticas basado en respuestas
function calculateColorAndStats(answers) {
    // Calcular RGB
    const red = Math.min(255, answers.slice(0, 7).reduce((acc, val) => acc + val * 10, 0));
    const green = Math.min(255, answers.slice(7, 14).reduce((acc, val) => acc + val * 10, 0));
    const blue = Math.min(255, answers.slice(14).reduce((acc, val) => acc + val * 10, 0));
    const colorHex = (red << 16) | (green << 8) | blue;
metallicMaterial.color.set(colorHex);
    // Calcular estadísticas (20 derivadas del color)
    const total = red + green + blue;
    const statistics = {
        Fuerza: red / 255 * 100,
        Agilidad: green / 255 * 100,
        Inteligencia: blue / 255 * 100,
        Resistencia: (red + green) / (2 * 255) * 100,
        Percepción: (green + blue) / (2 * 255) * 100,
        Carisma: (red + blue) / (2 * 255) * 100,
        Vitalidad: total / (3 * 255) * 100,
        Precisión: red / total * 100,
        Sigilo: green / total * 100,
        Sabiduría: blue / total * 100,
        Energía: (red * 0.6 + green * 0.3 + blue * 0.1) / 255 * 100,
        Destreza: (red * 0.3 + green * 0.6 + blue * 0.1) / 255 * 100,
        Creatividad: (red * 0.1 + green * 0.3 + blue * 0.6) / 255 * 100,
        Control: green / (red + blue + 1) * 100,
        Adaptabilidad: blue / (red + green + 1) * 100,
        Estrategia: red / (blue + green + 1) * 100,
        Resiliencia: (green - blue) / 255 * 100,
        Persuasión: (red - green) / 255 * 100,
        Serenidad: (blue - red) / 255 * 100,
        Caos: (red + green - blue) / (3 * 255) * 100
    };

    return { colorHex, statistics };
}
