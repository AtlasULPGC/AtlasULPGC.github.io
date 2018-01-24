import CamerasOrthographic from 'base/cameras/cameras.orthographic';

export default function setCamera() {
    let camera = new CamerasOrthographic(
        threeD.clientWidth / -2, threeD.clientWidth / 2,
        threeD.clientHeight / 2, threeD.clientHeight / -2,
        0.1, 10000);
    return camera;
}