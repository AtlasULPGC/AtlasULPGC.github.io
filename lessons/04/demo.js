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



setLoader();
