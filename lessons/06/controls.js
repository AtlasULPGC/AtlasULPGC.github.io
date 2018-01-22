function setControls() {
    controls = new AMI.TrackballControl(camera, threeD);
    controls.rotateSpeed = 5.5;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    threeD.addEventListener('mousedown', onMouseDown, false);
    threeD.addEventListener('mouseup', onMouseUp, false);
    window.addEventListener('resize', onWindowResize, false);
}
