// cuestionario.js

// Función para cargar la escena del cuestionario
export function loadQuizScene() {
    // Crear contenedor de cuestionario
    const quizContainer = document.createElement('div');
    quizContainer.id = 'quiz-container';
    document.body.appendChild(quizContainer);

    // Título del cuestionario
    const title = document.createElement('h3');
    title.innerText = 'Descubre tu color basado en tus temores';
    quizContainer.appendChild(title);

    // Crear formulario
    const form = document.createElement('form');
    form.id = 'quiz-form';
    quizContainer.appendChild(form);

    // Sección de preguntas Rojo (R)
    form.innerHTML += `
        <h4>Sección 1: Rojo (R)</h4>
        <label>¿Qué tan incómodo te sientes frente a situaciones de peligro físico? (1-5)</label>
        <input type="number" name="q1" min="1" max="5" required>
        <label>¿Temes al conflicto o a las confrontaciones? (1-5)</label>
        <input type="number" name="q2" min="1" max="5" required>
        <label>¿Te sientes ansioso/a en situaciones de estrés intenso? (1-5)</label>
        <input type="number" name="q3" min="1" max="5" required>
        <label>¿Te provoca miedo la violencia o el caos? (1-5)</label>
        <input type="number" name="q4" min="1" max="5" required>
        <label>¿Evitas riesgos extremos o deportes peligrosos? (1-5)</label>
        <input type="number" name="q5" min="1" max="5" required>
        <label>¿Te incomoda estar en lugares abarrotados? (1-5)</label>
        <input type="number" name="q6" min="1" max="5" required>
        <label>¿Qué tan reactivo/a eres ante el peligro inmediato? (1-5)</label>
        <input type="number" name="q7" min="1" max="5" required>
    `;

    // Sección de preguntas Verde (G)
    form.innerHTML += `
        <h4>Sección 2: Verde (G)</h4>
        <label>¿Te preocupa la incertidumbre en el futuro? (1-5)</label>
        <input type="number" name="q8" min="1" max="5" required>
        <label>¿Qué tan ansioso/a te pone la inestabilidad económica o laboral? (1-5)</label>
        <input type="number" name="q9" min="1" max="5" required>
        <label>¿Te sientes inseguro/a al caminar por lugares desconocidos? (1-5)</label>
        <input type="number" name="q10" min="1" max="5" required>
        <label>¿Te genera ansiedad perderte o no saber cómo llegar a un lugar? (1-5)</label>
        <input type="number" name="q11" min="1" max="5" required>
        <label>¿Te incomoda la idea de que las cosas cambien inesperadamente? (1-5)</label>
        <input type="number" name="q12" min="1" max="5" required>
        <label>¿Qué tan importante es la estabilidad en tu vida? (1-5)</label>
        <input type="number" name="q13" min="1" max="5" required>
        <label>¿Temes perder el control sobre lo que te rodea? (1-5)</label>
        <input type="number" name="q14" min="1" max="5" required>
    `;

    // Sección de preguntas Azul (B)
    form.innerHTML += `
        <h4>Sección 3: Azul (B)</h4>
        <label>¿Qué tan incómodo/a te hace sentir estar completamente solo/a? (1-5)</label>
        <input type="number" name="q15" min="1" max="5" required>
        <label>¿Te provoca miedo el silencio absoluto o la oscuridad total? (1-5)</label>
        <input type="number" name="q16" min="1" max="5" required>
        <label>¿Qué tan introspectivo/a eres cuando tienes miedo? (1-5)</label>
        <input type="number" name="q17" min="1" max="5" required>
        <label>¿Te preocupan preguntas existenciales como el propósito de la vida? (1-5)</label>
        <input type="number" name="q18" min="1" max="5" required>
        <label>¿Sientes temor por lo desconocido o lo incierto? (1-5)</label>
        <input type="number" name="q19" min="1" max="5" required>
        <label>¿Te asusta perderte en tus propios pensamientos o recuerdos? (1-5)</label>
        <input type="number" name="q20" min="1" max="5" required>
        <label>¿Qué tan conectado/a estás con la idea de infinito o vacío? (1-5)</label>
        <input type="number" name="q21" min="1" max="5" required>
    `;

    // Botón para enviar el cuestionario
    const submitButton = document.createElement('button');
    submitButton.innerText = 'Descubrir mi color';
    form.appendChild(submitButton);

    // Función para calcular el color y las estadísticas
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const answers = Array.from(formData.values()).map(value => parseInt(value, 10));

        // Calcular los valores de RGB a partir de las respuestas
        const red = Math.min(255, answers.slice(0, 7).reduce((acc, val) => acc + val * 10, 0)); // Sección 1
        const green = Math.min(255, answers.slice(7, 14).reduce((acc, val) => acc + val * 10, 0)); // Sección 2
        const blue = Math.min(255, answers.slice(14).reduce((acc, val) => acc + val * 10, 0)); // Sección 3

        // Convertir RGB a Hex
        const colorHex = (red << 16) | (green << 8) | blue;

        // Mostrar el resultado
        alert(`Tu color es: #${colorHex.toString(16).padStart(6, '0').toUpperCase()}`);

        // Llamar a la función que actualiza el color del cubo
        updateCubeColor(colorHex);

        // Mostrar estadísticas
        showStatistics(answers);
    });

    // Función para actualizar el color del cubo
    function updateCubeColor(colorHex) {
        const cube = window.cube; // Usamos la variable global del cubo
        if (cube) {
            cube.material.color.set(colorHex);
        }
    }

    // Función para mostrar las estadísticas
    function showStatistics(answers) {
        const statsPanel = document.createElement('div');
        statsPanel.id = 'stats-panel';
        document.body.appendChild(statsPanel);

        const statsTitle = document.createElement('h4');
        statsTitle.innerText = 'Tus Estadísticas';
        statsPanel.appendChild(statsTitle);

        const statsList = document.createElement('ul');
        statsPanel.appendChild(statsList);

        // Estadísticas basadas en las respuestas
        const stats = [
            { label: 'Rojo (R)', value: answers.slice(0, 7).reduce((acc, val) => acc + val, 0) },
            { label: 'Verde (G)', value: answers.slice(7, 14).reduce((acc, val) => acc + val, 0) },
            { label: 'Azul (B)', value: answers.slice(14).reduce((acc, val) => acc + val, 0) }
        ];

        stats.forEach(stat => {
            const statItem = document.createElement('li');
            statItem.innerText = `${stat.label}: ${stat.value}`;
            statsList.appendChild(statItem);
        });
    }
}
