/* globals Stats, dat, AMI*/

// standard global letiables
var controls;
var threeD;
var renderer;
var stats;
var camera;
var scene;
var vrHelper;
var lut;
var ready = false;



var myStack = setStack();




/**
 * Init the scene
 */
function init() {
    /**
     * Rendering loop
     */
    function animate() {
        // render
        controls.update();

        if (ready) {
            renderer.render(scene, camera);
        }

        stats.update();

        // request new frame
        requestAnimationFrame(function () {
            animate();
        });
    }

    // renderer
    setRenderer();

    // stats
    stats = new Stats();
    threeD.appendChild(stats.domElement);

    // scene
    scene = new THREE.Scene();

    // camera
    setCamera();

    // controls
    setControls();

    // start rendering loop
    animate();
}

// init threeJS...
init();



setLoader();
