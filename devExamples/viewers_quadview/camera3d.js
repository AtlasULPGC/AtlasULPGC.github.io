export default function setCamera3d(renderObj) {
    const fieldOfView = 45;
    const aspectRatio = renderObj.domElement.clientWidth / renderObj.domElement.clientHeight;
    const near = 0.1;
    const far = 100000;
    renderObj.camera = new THREE.PerspectiveCamera(
        fieldOfView, aspectRatio,
        near, far);
    renderObj.camera.position.x = 250;
    renderObj.camera.position.y = 250;
    renderObj.camera.position.z = 250;
}