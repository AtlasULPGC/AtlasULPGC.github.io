function setCamera() {
    let fieldOfView = 45;
    let aspectRatio = container.offsetWidth / container.offsetHeight;
    let near = 0.01;
    let far = 10000000;
    var camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
    camera.position.x = 150;
    camera.position.y = 150;
    camera.position.z = 100;
    return camera;
}