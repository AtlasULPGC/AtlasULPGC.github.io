/* globals Stats, dat, AMI*/

// standard global variables
var controls;
var renderer;
var camera;
var statsyay;
var threeD;
//
var sceneLayer0TextureTarget;
var sceneLayer1TextureTarget;
//
var sceneLayer0;
//
var lutLayer0;
var sceneLayer1;
var meshLayer1;
var uniformsLayer1;
var materialLayer1;
var lutLayer1;
var sceneLayerMix;
var meshLayerMix;
var uniformsLayerMix;
var materialLayerMix;

var layerMix = {
    opacity1: 1.0,
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
        // render first layer offscreen
        renderer.render(sceneLayer0, camera, sceneLayer0TextureTarget, true);
        // render second layer offscreen
        renderer.render(sceneLayer1, camera, sceneLayer1TextureTarget, true);
        // mix the layers and render it ON screen!
        renderer.render(sceneLayerMix, camera);
        statsyay.update();

        // request new frame
        requestAnimationFrame(function() {
            animate();
        });
    }

    // renderer
    setRenderer();

    // stats
    statsyay = new Stats();
    threeD.appendChild(statsyay.domElement);
    setScene();

    // camera
    setCamera();

    // controls
    setControls();

    animate();
}

// init threeJS...
init();

var files = setDicomDataUrl();

// load sequence for each file
// instantiate the loader
// it loads and parses the dicom image
var loader = new AMI.VolumeLoader(threeD);





loader
    .load(files)
    .then(function() {
        handleSeries();
    })
    .catch(function(error) {
        window.console.log('oops... something went wrong...');
        window.console.log(error);
    });
