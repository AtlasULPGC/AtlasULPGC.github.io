import CamerasOrthographic from 'base/cameras/cameras.orthographic';

export default function setCamera() {
    const left = threeD.clientWidth / -2;
    const top = threeD.clientWidth / 2;
    const right = threeD.clientHeight / 2;
    const bottom = threeD.clientHeight / -2;
    const near = 0.1;
    const far = 10000;
    let camera = new CamerasOrthographic(
        left, top,
        right, bottom,
        near, far);
    return camera;
}