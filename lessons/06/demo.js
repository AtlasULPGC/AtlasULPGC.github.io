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
 * Handle mouse down event
 */
function onMouseDown() {
    if (vrHelper && vrHelper.uniforms) {
        vrHelper.uniforms.uSteps.value = Math.floor(myStack.steps / 2);
        vrHelper.interpolation = 0;
    }
}

/**
 * Handle mouse up event
 */
function onMouseUp() {
    if (vrHelper && vrHelper.uniforms) {
        vrHelper.uniforms.uSteps.value = myStack.steps;
        vrHelper.interpolation = myStack.interpolation;
    }
}

/**
 * Handle window resize event
 */
function onWindowResize() {
    // update the camera
    camera.aspect = threeD.offsetWidth / threeD.offsetHeight;
    camera.updateProjectionMatrix();

    // notify the renderer of the size change
    renderer.setSize(threeD.offsetWidth, threeD.offsetHeight);
}



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
