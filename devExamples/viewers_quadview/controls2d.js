import ControlsOrthographic from 'base/controls/controls.trackballortho';

export default function setControls2d(rendererObj) {
    rendererObj.controls = new ControlsOrthographic(
        rendererObj.camera, rendererObj.domElement);
    rendererObj.controls.staticMoving = true;
    rendererObj.controls.noRotate = true;
    rendererObj.camera.controls = rendererObj.controls;
}