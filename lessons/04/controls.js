function setControls() {
    controls = new AMI.TrackballOrthoControl(camera, threeD);
    controls.staticMoving = true;
    controls.noRotate = true;
    camera.controls = controls;
}