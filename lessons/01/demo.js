/* globals dat, AMI*/


var {container, renderer} = setRenderer();

var scene = new THREE.Scene();

var camera = setCamera();

var controls = new AMI.TrackballControl(camera, container);


/**
 * Handle window resize
 */
function onWindowResize() {
    updateCamera();
    updateRenderer();

    function updateCamera() {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
    }

    function updateRenderer() {
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    }
}

window.addEventListener('resize', onWindowResize, false);




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
