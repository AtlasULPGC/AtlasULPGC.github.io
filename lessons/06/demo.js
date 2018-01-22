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
        controls.update();

        if (ready) {
            renderer.render(scene, camera);
        }

        stats.update();

        requestAnimationFrame(function () {
            animate();
        });
    }

    setRenderer();

    setStats();

    scene = new THREE.Scene();

    setCamera();

    setControls();

    animate();
}

init();

setLoader();
