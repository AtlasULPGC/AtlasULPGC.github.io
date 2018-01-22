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

init();


function init() {

    setRenderer();
    setStats();
    setScene();

    setCamera();


    setControls();

    animate();
}

var files = setDicomDataUrl();

var loader = setLoader(files);




