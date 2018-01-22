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

var myStack = {
    lut: 'random',
    opacity: 'random',
    steps: 256,
    alphaCorrection: 0.5,
    interpolation: 1
};

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

var file = 'https://cdn.rawgit.com/FNNDSC/data/master/nifti/eun_brain/eun_uchar_8.nii.gz';

var loader = new AMI.VolumeLoader(threeD);
loader.load(file).then(function () {
    var series = loader.data[0].mergeSeries(loader.data)[0];
    loader.free();
    loader = null;
    // get first stack from series
    var stack = series.stack[0];

    vrHelper = new AMI.VolumeRenderingHelper(stack);
    // scene
    scene.add(vrHelper);

    // CREATE LUT
    lut = new AMI.LutHelper('my-tf');
    lut.luts = AMI.LutHelper.presetLuts();
    lut.lutsO = AMI.LutHelper.presetLutsO();
    // update related uniforms
    vrHelper.uniforms.uTextureLUT.value = lut.texture;
    vrHelper.uniforms.uLut.value = 1;

    // update camrea's and interactor's target
    var centerLPS = stack.worldCenter();
    camera.lookAt(centerLPS.x, centerLPS.y, centerLPS.z);
    camera.updateProjectionMatrix();
    controls.target.set(centerLPS.x, centerLPS.y, centerLPS.z);

    // create GUI
    buildGUI();

    ready = true;
});
