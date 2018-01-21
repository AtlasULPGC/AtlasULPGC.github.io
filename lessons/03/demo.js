/* globals dat, AMI*/

var {container, renderer} = setRenderer();

var scene = new THREE.Scene();



var camera = setCamera();


// Setup controls
var controls = setControls(camera);

/**
 * Handle window resize
 */
function onWindowResize() {
    camera.canvas = {
        width: container.offsetWidth,
        height: container.offsetHeight,
    };
    camera.fitBox(2);

    renderer.setSize(container.offsetWidth, container.offsetHeight);
}

window.addEventListener('resize', onWindowResize, false);

/**
 * Build GUI
 */


/**
 * Start animation loop
 */
function animate() {
    controls.update();
    renderer.render(scene, camera);

    // request new frame
    requestAnimationFrame(function () {
        animate();
    });
}

animate();



// Setup loader
setLoader();
