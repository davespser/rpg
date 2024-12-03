// lobby.js

// Importa las funciones necesarias de cuestionario.js
import { loadQuizScene } from './cuestionario.js';

// Función que se ejecuta cuando se carga la escena de lobby
export function loadLobbyScene() {
    // Crea el contenedor para la interfaz de lobby
    const lobbyContainer = document.createElement('div');
    lobbyContainer.id = 'lobby-container';
    document.body.appendChild(lobbyContainer);

    // Título del lobby
    const title = document.createElement('h1');
    title.innerText = 'Bienvenido al Juego';
    lobbyContainer.appendChild(title);

    // Botón para empezar el juego
    const startButton = document.createElement('button');
    startButton.innerText = 'Empezar Juego';
    startButton.onclick = function() {
        // Elimina el lobby y carga la escena de cuestionario
        document.body.removeChild(lobbyContainer);
        loadQuizScene();
    };
    lobbyContainer.appendChild(startButton);

    // Botón para opciones (aquí puedes agregar más funcionalidades si lo deseas)
    const optionsButton = document.createElement('button');
    optionsButton.innerText = 'Opciones';
    optionsButton.onclick = function() {
        // Aquí puedes agregar opciones si lo deseas más adelante
        alert("Opciones aún no implementadas");
    };
    lobbyContainer.appendChild(optionsButton);
}

// Llamamos a la función loadLobbyScene para mostrar el lobby al inicio
loadLobbyScene();
