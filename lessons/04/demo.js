var controls;
var renderer;
var camera;
var statsyay;
var threeD;
//
var sceneLayerCTTextureTarget;
var sceneLayerSegmentationTextureTarget;
//
var sceneLayerCT;
//
var lutLayer0;
var sceneLayerSegmentation;
var meshSegmentationLayer;
var uniformShaderSegmentationLayer;
var materialSegmentationLayer;
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
    setCTLayerTexture();
    setSegmentationLayerTexture();

    setCamera();


    setControls();

    animate();
}

var files = setDicomDataUrl();

var loader = setLoader(files);




