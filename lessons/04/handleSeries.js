function handleSeries() {

    var mergedSeries = loader.data[0].mergeSeries(loader.data);
    console.log(mergedSeries);
    var ctGrayImagesStack = mergedSeries[0].stack[0];
    var segmentationStack = mergedSeries[1].stack[0];
    loader.free();
    loader = null;

    var stackHelper = new AMI.StackHelper(ctGrayImagesStack);
    stackHelper.bbox.visible = false;
    stackHelper.border.visible = false;
    stackHelper.index = 10;

    sceneLayerCT.add(stackHelper);

    prepareStackToCreateLabelMap(segmentationStack);

    var currentRawTexturesForLabelMap = setRawTextureForLabelMap(segmentationStack);

    setUniformShaderSegmentationLayer(segmentationStack, currentRawTexturesForLabelMap);

    generateShadersOnDemand();

    setMeshSegmentationLayer(stackHelper, ctGrayImagesStack);

    setMixLayer();
    setMeshLayerMix(stackHelper, ctGrayImagesStack);
    setCameraOnTarget(ctGrayImagesStack);

    const {lut, lut0} = setLutForGrayImageCTLayer();
    setLutForSegmentationLayer(segmentationStack, lut, lut0);

    buildGUI(stackHelper);
}

