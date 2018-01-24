function setRenderer() {
    threeD = document.getElementById('r3d');
    renderer = new THREE.WebGLRenderer({
        antialias: true,
    });
    renderer.setSize(threeD.clientWidth, threeD.clientHeight);
    renderer.setClearColor('#212121', 1);

    threeD.appendChild(renderer.domElement);
    return [threeD, renderer];
}
