

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

    // CREATE LUT
    const domTarget = 'my-lut-canvases-l0';
    const lut = 'default';
    const lut0 = 'linear';
    const color = [[0, 0, 0, 0], [1, 1, 1, 1]];
    const opacity = [[0, 1], [1, 1]];
    lutLayer0 = new AMI.LutHelper(
        domTarget,
        lut,
        lut0,
        color,
        opacity
    );
    lutLayer0.luts = AMI.LutHelper.presetLuts();

    const domTargetForSecondLayer = 'my-lut-canvases-l1';
    const segmentationLUT = segmentationStack.segmentationLUT;
    const segmentationLUTO = segmentationStack.segmentationLUTO;
    const discrete = true;
    lutLayer1 = new AMI.LutHelper(
        domTargetForSecondLayer,
        lut,
        lut0,
        segmentationLUT,
        segmentationLUTO,
        discrete
    );
    uniformShaderSegmentationLayer.uLut.value = 1;
    uniformShaderSegmentationLayer.uTextureLUT.value = lutLayer1.texture;

    buildGUI(stackHelper);
}