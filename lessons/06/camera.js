function setCamera() {
    const fieldOfView = 45;
    const aspectRelation = threeD.offsetWidth / threeD.offsetHeight;
    const near = 0.1;
    const far = 100000;
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRelation, near, far);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 0;
    camera.up.set(0, 0, 0);
}

function updateCamera(stack) {
    var centerLPS = stack.worldCenter();
    camera.lookAt(centerLPS.x, centerLPS.y, centerLPS.z);
    camera.updateProjectionMatrix();
    return centerLPS;
}

function updateCameraOnWindowResize() {
    camera.aspect = threeD.offsetWidth / threeD.offsetHeight;
    camera.updateProjectionMatrix();
}