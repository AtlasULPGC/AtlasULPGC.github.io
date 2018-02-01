import ControlsOrthographic from 'base/controls/controls.trackballortho';

function setControls2d(rendererObj) {
    rendererObj.controls = new ControlsOrthographic(
        rendererObj.camera, rendererObj.domElement);
    rendererObj.controls.staticMoving = true;
    rendererObj.controls.noRotate = true;
    rendererObj.camera.controls = rendererObj.controls;
}

function updateRenderersControls(renderer3d, axialRenderer, sagittalRenderer, coronalRenderer) {
    renderer3d.controls.update();
    axialRenderer.controls.update();
    sagittalRenderer.controls.update();
    coronalRenderer.controls.update();
}

export {setControls2d, updateRenderersControls};