var {container, renderer} = setRenderer();

var scene = new THREE.Scene();

var camera = setCamera();

var controls = new AMI.TrackballControl(camera, container);

function onWindowResize() {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.offsetWidth, container.offsetHeight);
}

window.addEventListener('resize', onWindowResize, false);

var particleLight = setParticleLight();


setAmbientLight();


var directionalLight = setDirectionalLight();
scene.add(directionalLight);

var pointLight = setPointLight();
particleLight.add(pointLight);

loadSTLModel(scene);

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
