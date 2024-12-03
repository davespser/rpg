// Escena del Cuestionario
const sceneQuiz = new THREE.Scene();
const cameraQuiz = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Crear un cubo diferente para la escena del cuestionario
const geometryQuiz = new THREE.BoxGeometry();
const materialQuiz = new THREE.MeshBasicMaterial({ color: 0xFF5722 });
const cubeQuiz = new THREE.Mesh(geometryQuiz, materialQuiz);
sceneQuiz.add(cubeQuiz);

cameraQuiz.position.z = 5;

// Contenedor del cuestionario
const quizContainer = document.createElement('div');
quizContainer.style.position = 'absolute';
quizContainer.style.top = '10%';
quizContainer.style.left = '10%';
quizContainer.style.background = 'rgba(255, 255, 255, 0.9)';
quizContainer.style.padding = '20px';
quizContainer.style.borderRadius = '10px';
quizContainer.innerHTML = `
    <h3>Descubre tu color</h3>
    <form id="quiz-form">
        <label>¿Qué tan incómodo te sientes frente a situaciones de peligro físico? (1-5)</label>
        <input type="number" name="q1" min="1" max="5" required>
        <label>¿Temes al conflicto o a las confrontaciones? (1-5)</label>
        <input type="number" name="q2" min="1" max="5" required>
        <!-- Agrega más preguntas aquí -->
        <button type="submit">Calcular Color</button>
    </form>
`;
quizContainer.style.display = 'none';
document.body.appendChild(quizContainer);

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
    const { colorHex } = calculateColor(answers);

    // Actualizar el color del cubo en la escena del cuestionario
    materialQuiz.color.set(colorHex);

    alert(`¡Tu color es: #${colorHex.toString(16).padStart(6, '0').toUpperCase()}!`);
});

// Calcular el color basado en respuestas
function calculateColor(answers) {
    const red = Math.min(255, answers.slice(0, 7).reduce((acc, val) => acc + val * 10, 0));
    const green = Math.min(255, answers.slice(7, 14).reduce((acc, val) => acc + val * 10, 0));
    const blue = Math.min(255, answers.slice(14).reduce((acc, val) => acc + val * 10, 0));
    const colorHex = (red << 16) | (green << 8) | blue;
    return { colorHex };
}
