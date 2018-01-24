/* globals dat*/

import readMultipleFiles from './loader';
import setCamera from './camera';
import setControls from './controls';

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
    
    document.getElementById('filesinput')
        .addEventListener('change', function (event) {
            readMultipleFiles(event, scene, camera, lut, camUtils, controls)
        }, false);
};
