function setControls(camera) {
    var controls = new AMI.TrackballOrthoControl(camera, container);
    controls.staticMoving = true;
    controls.noRotate = true;
    camera.controls = controls;
    return controls;
}
