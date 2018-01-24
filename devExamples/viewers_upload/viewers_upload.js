/* globals dat*/

import setCamera from './camera';
import setControls from './controls';
import startReadingFromFilesInputOnChangeEvent from './readingEventFromFilesInput';

let renderer;
let threeD;
[threeD, renderer] = setRenderer();
let camera = setCamera();
let controls = setControls(controls, camera);
let scene;
let lut;

let camUtils = {
    invertRows: false,
    invertColumns: false,
    rotate: false,
    orientation: 'default',
    convention: 'radio',
};

function init() {

    function animate() {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(function () {
            animate();
        });
    }

    scene = new THREE.Scene();
    animate();
}


window.onload = function () {
    setLoadButtonWithFileInput();
    init();
    startReadingFromFilesInputOnChangeEvent(scene, camera, lut, camUtils, controls);
};
