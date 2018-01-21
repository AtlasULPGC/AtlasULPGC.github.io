
function setRenderer() {
    var container = document.getElementById('container');
    let smoothBorders = true;
    var renderer = new THREE.WebGLRenderer({
        antialias: smoothBorders
    });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    let grayColor = 0x353535;
    let alpha = 1;
    renderer.setClearColor(grayColor, alpha);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    return {container, renderer};
}