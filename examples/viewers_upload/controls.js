import ControlsOrthographic from 'base/controls/controls.trackballortho';

export default function setControls(controls, camera) {
    controls = new ControlsOrthographic(camera, threeD);
    controls.staticMoving = true;
    controls.noRotate = true;
    camera.controls = controls;
    return controls;
}


