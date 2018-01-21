function setRenderer() {
    var container = document.getElementById('container');
    var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x353535, 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    return {container, renderer};
}