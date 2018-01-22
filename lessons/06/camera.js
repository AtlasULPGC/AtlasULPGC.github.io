function setCamera() {
    const fieldOfView = 45;
    const aspectRelation = threeD.offsetWidth / threeD.offsetHeight;
    const near = 0.1;
    const far = 100000;
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRelation, near, far);
    camera.position.x = 150;
    camera.position.y = 400;
    camera.position.z = -350;
    camera.up.set(-0.5, 0.5, 0.5);
}