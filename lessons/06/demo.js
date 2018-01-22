/* globals Stats, dat, AMI*/

var controls;
var threeD;
var renderer;
var stats;
var camera;
var scene;
var vrHelper;
var lut;
var fileLoadedAndGuiReady = false;


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

        if (fileLoadedAndGuiReady) {
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
