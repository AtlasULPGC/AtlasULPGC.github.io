import ControlsTrackball from 'base/controls/controls.trackball';

export default function setControls3d(renderObj) {
    renderObj.controls = new ControlsTrackball(
        renderObj.camera, renderObj.domElement);
    renderObj.controls.rotateSpeed = 5.5;
    renderObj.controls.zoomSpeed = 1.2;
    renderObj.controls.panSpeed = 0.8;
    renderObj.controls.staticMoving = true;
    renderObj.controls.dynamicDampingFactor = 0.3;
}