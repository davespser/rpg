// cuestionario.js

// Configurar Three.js y la escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear el cubo con material básico
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Colocar la cámara
camera.position.z = 5;

// Animación básica para el cubo
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Función para generar el cuestionario
function generateQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <h3>Cuestionario de Temores</h3>
        <form id="quiz-form">
            <label for="q1">Pregunta 1: ¿Qué tan incómodo te sientes frente a situaciones de peligro físico? (Escala 1-5)</label>
            <input type="number" id="q1" name="q1" min="1" max="5" required>
            <label for="q2">Pregunta 2: ¿Temes al conflicto o a las confrontaciones? (Escala 1-5)</label>
            <input type="number" id="q2" name="q2" min="1" max="5" required>
            <label for="q3">Pregunta 3: ¿Te sientes ansioso/a en situaciones de estrés intenso? (Escala 1-5)</label>
            <input type="number" id="q3" name="q3" min="1" max="5" required>
            <!-- Añadir todas las preguntas aquí -->
            <button type="submit">Enviar</button>
        </form>
    `;

    // Manejador del formulario
    document.getElementById('quiz-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener respuestas
        const formData = new FormData(event.target);
        const answers = Array.from(formData.values()).map(value => parseInt(value));

        // Calcular los valores RGB (como un ejemplo simplificado)
        const red = answers.slice(0, 7).reduce((acc, val) => acc + val, 0);
        const green = answers.slice(7, 14).reduce((acc, val) => acc + val, 0);
        const blue = answers.slice(14).reduce((acc, val) => acc + val, 0);

        // Actualizar el cubo con el color calculado
        cube.material.color.setRGB(red / 255, green / 255, blue / 255);
        alert('Tu color ha sido calculado');
    });
}

// Mostrar cuestionario cuando se cargue
generateQuiz();
