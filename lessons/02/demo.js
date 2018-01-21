/* globals AMI*/


// Setup renderer
var {container, renderer} = setRenderer();

// Setup scene
var scene = new THREE.Scene();


// Setup camera
var camera = setCamera();

// Setup controls
var controls = new AMI.TrackballControl(camera, container);

/**
 * Handle window resize
 */
function onWindowResize() {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.offsetWidth, container.offsetHeight);
}

window.addEventListener('resize', onWindowResize, false);


// Setup lights
var particleLight = setParticleLight();


setAmbientLight();


var directionalLight = setDirectionalLight();
scene.add(directionalLight);

var pointLight = setPointLight();
particleLight.add(pointLight);

// Load STL model
loadSTLModel(scene);


// Setup loader
setLoader();

/**
 * Start animation loop
 */
function animate() {
    var timer = Date.now() * 0.00025;

    particleLight.position.x = Math.sin(timer * 7) * 100;
    particleLight.position.y = Math.cos(timer * 5) * 120;
    particleLight.position.z = Math.cos(timer * 3) * 140;

    controls.update();
    renderer.render(scene, camera);

    // request new frame
    requestAnimationFrame(function () {
        animate();
    });
}

animate();
