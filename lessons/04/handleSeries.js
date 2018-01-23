

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

