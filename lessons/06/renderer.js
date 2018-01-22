function setRenderer() {
    threeD = document.getElementById('r3d');
    renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    renderer.setSize(threeD.offsetWidth, threeD.offsetHeight);
    threeD.appendChild(renderer.domElement);
}