/* globals dat*/


import buildGUI from './gui';
import handleSeries from './handleSeries';
import readMultipleFiles from './loader';
import setCamera from './camera';
import setControls from './controls';
// standard global variables
let renderer;
let threeD;
[threeD, renderer] = setRenderer();
let camera = setCamera();
let controls = setControls(controls, camera);
let scene;
let lut;


// probe
let camUtils = {
    invertRows: false,
    invertColumns: false,
    rotate: false,
    orientation: 'default',
    convention: 'radio',
};


/**
 * Init the scene
 */
function init() {
    /**
     * Animation loop
     */
    function animate() {
        // render
        controls.update();
        renderer.render(scene, camera);

        // request new frame
        requestAnimationFrame(function () {
            animate();
        });
    }

    // renderer


    // scene
    scene = new THREE.Scene();
    // camera


    // controls


    animate();
}


window.onload = function () {
    // hookup load button
    setLoadButtonWithFileInput();

    // init threeJS...
    init();





    // hook up file input listener
    document.getElementById('filesinput')
        .addEventListener('change', function (event) {
            readMultipleFiles(event, scene, camera, lut, camUtils, controls)
        }, false);
};
