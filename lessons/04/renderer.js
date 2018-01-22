function setRenderer() {
    threeD = document.getElementById('container');
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
    });
    renderer.setSize(threeD.clientWidth, threeD.clientHeight);
    let blueColor = 0x607d8b;
    let alpha = 1;
    renderer.setClearColor(blueColor, alpha);
    threeD.appendChild(renderer.domElement);
}