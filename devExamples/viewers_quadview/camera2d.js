import CamerasOrthographic from 'base/cameras/cameras.orthographic';

export default function setCamera2d(rendererObj) {
    const left = rendererObj.domElement.clientWidth / -2;
    const top = rendererObj.domElement.clientWidth / 2;
    const right = rendererObj.domElement.clientHeight / 2;
    const bottom = rendererObj.domElement.clientHeight / -2;
    const near = 1;
    const far = 1000;
    rendererObj.camera = new CamerasOrthographic(
        left,
        top,
        right,
        bottom,
        near, far);
}