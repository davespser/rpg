// Escena del Lobby
const sceneLobby = new THREE.Scene();
const cameraLobby = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear el cubo de la escena del lobby
const geometryLobby = new THREE.BoxGeometry();
const materialLobby = new THREE.MeshBasicMaterial({ color: 0x007BFF });
const cubeLobby = new THREE.Mesh(geometryLobby, materialLobby);
sceneLobby.add(cubeLobby);

cameraLobby.position.z = 5;

// Añadir imagen de fondo usando CSS
document.body.style.backgroundImage = "url('https://images.search.yahoo.com/images/view;_ylt=AwrFGoi6dFBnwZQaeIWInIlQ;_ylu=c2VjA3NyBHNsawNpbWcEb2lkA2JlMDQ0N2U2Y2RiMmU3Njk4YTUxYTZmZmQyMGE4ZDAyBGdwb3MDMTE3BGl0A2Jpbmc-?back=https%3A%2F%2Fimages.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Durl%2Bterrorific%2Broman%2Bquary%2Bimage%26q%3Durl%2Bterrorific%2Broman%2Bquary%2Bimage%26fr%3Dsfp%26fr2%3Dpiv-web%26nost%3D1%26tab%3Dorganic%26ri%3D117&w=760&h=609&imgurl=media-cldnry.s-nbcnews.com%2Fimage%2Fupload%2Ft_fit-760w%2Cf_auto%2Cq_auto%3Abest%2Fstreams%2F2013%2FDecember%2F131202%2F2D9813610-underground_Quarry.jpg&rurl=https%3A%2F%2Fwww.nbcnews.com%2Fscience%2Fmaze-ancient-tunnels-mapped-keep-rome-falling-again-2D11674426&size=59KB&p=url+terrorific+roman+quary+image&oid=be0447e6cdb2e7698a51a6ffd20a8d02&fr2=piv-web&fr=sfp&tt=Maze+of+ancient+tunnels+mapped&b=61&ni=21&no=117&ts=&tab=organic&sigr=RXXxeyb6Ypmf&sigb=FaI7NPPrPVDn&sigi=FG92SyvorG7t&sigt=jFRgW15wME.t&.crumb=mPkJbQQBgBw&fr=sfp&fr2=piv-web')"; // Ruta a tu imagen
document.body.style.backgroundSize = "cover"; // Para que cubra todo el fondo
document.body.style.backgroundPosition = "center"; // Centrado
document.body.style.margin = "0";
document.body.style.overflow = "hidden"; // Evitar scroll

// Mostrar texto de instrucciones (canvas 2D sobre la escena 3D)
const lobbyContainer = document.createElement('div');
lobbyContainer.style.position = 'absolute';
lobbyContainer.style.top = '50%';
lobbyContainer.style.left = '50%';
lobbyContainer.style.transform = 'translate(-50%, -50%)';
lobbyContainer.style.textAlign = 'center';
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
    // Cambiar a la escena del cuestionario
    lobbyContainer.style.display = 'none';
    loadQuizScene();
});

document.getElementById('options-button').addEventListener('click', () => {
    alert("Opciones: Aún no implementado.");
});
