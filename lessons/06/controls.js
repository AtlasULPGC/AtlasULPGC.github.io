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

function updateControls(centerLPS) {
    controls.target.set(centerLPS.x, centerLPS.y, centerLPS.z);
}

/**
 * Handle mouse down event
 */
function onMouseDown() {
    if (vrHelper && vrHelper.uniforms) {
        vrHelper.uniforms.uSteps.value = Math.floor(myStack.steps / 2);
        vrHelper.interpolation = 0;
    }
}

/**
 * Handle mouse up event
 */
function onMouseUp() {
    if (vrHelper && vrHelper.uniforms) {
        vrHelper.uniforms.uSteps.value = myStack.steps;
        vrHelper.interpolation = myStack.interpolation;
    }
}

/**
 * Handle window resize event
 */
function onWindowResize() {
    // update the camera
    camera.aspect = threeD.offsetWidth / threeD.offsetHeight;
    camera.updateProjectionMatrix();

    // notify the renderer of the size change
    renderer.setSize(threeD.offsetWidth, threeD.offsetHeight);
}
