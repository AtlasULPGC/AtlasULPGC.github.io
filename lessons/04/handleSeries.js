

function handleSeries() {

    var mergedSeries = loader.data[0].mergeSeries(loader.data);
    var ctGrayImagesStack = mergedSeries[0].stack[0];
    var segmentationStack = mergedSeries[1].stack[0];
    loader.free();
    loader = null;

    var stackHelper = new AMI.StackHelper(ctGrayImagesStack);
    stackHelper.bbox.visible = false;
    stackHelper.border.visible = false;
    stackHelper.index = 10;

    sceneLayerCT.add(stackHelper);

    //
    //
    // create labelmap....
    // we only care about the geometry....
    // get first stack from series
    // prepare it
    // * ijk2LPS transforms
    // * Z spacing
    // * etc.
    //
    prepareStackToCreateLabelMap(segmentationStack);

    var currentRawTexturesForLabelMap = setRawTextureForLabelMap(segmentationStack);

    setUniformShaderSegmentationLayer(segmentationStack, currentRawTexturesForLabelMap);

    generateShadersOnDemand();

    setMeshSegmentationLayer(stackHelper, ctGrayImagesStack);

    // Create the Mix layer
    setMixLayer();
    setMeshLayerMix(stackHelper, ctGrayImagesStack);
    setCameraOnTarget(ctGrayImagesStack);

    // CREATE LUT
    const {lut, lut0} = setLutForGrayImageCTLayer();
    setLutForSegmentationLayer(segmentationStack, lut, lut0);

    buildGUI(stackHelper);
}

function setCameraOnTarget(ctGrayImagesStack) {
//
    // set camera
    var worldbb = ctGrayImagesStack.worldBoundingBox();
    var lpsDims = new THREE.Vector3(worldbb[1] - worldbb[0], worldbb[3] - worldbb[2], worldbb[5] - worldbb[4]);

    // box: {halfDimensions, center}
    var box = {
        center: ctGrayImagesStack.worldCenter().clone(),
        halfDimensions: new THREE.Vector3(lpsDims.x + 10, lpsDims.y + 10, lpsDims.z + 10)
    };

    // init and zoom
    var canvas = {
        width: threeD.clientWidth,
        height: threeD.clientHeight,
    };
    camera.directions = [ctGrayImagesStack.xCosine, ctGrayImagesStack.yCosine, ctGrayImagesStack.zCosine];
    camera.box = box;
    camera.canvas = canvas;
    camera.update();
    camera.fitBox(2);
}