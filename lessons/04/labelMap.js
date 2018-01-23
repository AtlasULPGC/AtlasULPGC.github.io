function prepareStackToCreateLabelMap(segmentationStack) {
    segmentationStack.prepare();
    segmentationStack.pack();
}

function setRawTextureForLabelMap(segmentationStack) {
    var rawTexturesForLabelMap = [];
    const width = segmentationStack.textureSize;
    const height = segmentationStack.textureSize;
    const format = segmentationStack.textureType;
    const type = THREE.UnsignedByteType;
    const mapping = THREE.UVMapping;
    const wrapX = THREE.ClampToEdgeWrapping;
    const wrapY = THREE.ClampToEdgeWrapping;
    const magFilter = THREE.NearestFilter;
    const minFilter = THREE.NearestFilter;
    for (var m = 0; m < segmentationStack._rawData.length; m++) {

        const data = segmentationStack.rawData[m];
        var tex = new THREE.DataTexture(
            data,
            width,
            height,
            format,
            type,
            mapping,
            wrapX,
            wrapY,
            magFilter,
            minFilter
        );
        tex.needsUpdate = true;
        tex.flipY = true;
        rawTexturesForLabelMap.push(tex);
    }
    return rawTexturesForLabelMap;
}

function setUniformShaderSegmentationLayer(segmentationStack, textures2) {
    uniformShaderSegmentationLayer = AMI.DataUniformShader.uniforms();
    uniformShaderSegmentationLayer.uTextureSize.value = segmentationStack.textureSize;
    uniformShaderSegmentationLayer.uTextureContainer.value = textures2;
    uniformShaderSegmentationLayer.uWorldToData.value = segmentationStack.lps2IJK;
    uniformShaderSegmentationLayer.uNumberOfChannels.value = segmentationStack.numberOfChannels;
    uniformShaderSegmentationLayer.uPixelType.value = segmentationStack.pixelType;
    uniformShaderSegmentationLayer.uBitsAllocated.value = segmentationStack.bitsAllocated;
    uniformShaderSegmentationLayer.uWindowCenterWidth.value = [segmentationStack.windowCenter, segmentationStack.windowWidth];
    uniformShaderSegmentationLayer.uRescaleSlopeIntercept.value = [segmentationStack.rescaleSlope, segmentationStack.rescaleIntercept];
    uniformShaderSegmentationLayer.uDataDimensions.value = [segmentationStack.dimensionsIJK.x, segmentationStack.dimensionsIJK.y, segmentationStack.dimensionsIJK.z];
    uniformShaderSegmentationLayer.uInterpolation.value = 0;
}

function generateShadersOnDemand() {
    var fs = new AMI.DataFragmentShader(uniformShaderSegmentationLayer);
    var vs = new AMI.DataVertexShader();
    materialSegmentationLayer = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        uniforms: uniformShaderSegmentationLayer,
        vertexShader: vs.compute(),
        fragmentShader: fs.compute(),
    });
}

function setMeshSegmentationLayer(stackHelper, ctGrayImagesStack) {
    meshSegmentationLayer = new THREE.Mesh(stackHelper.slice.geometry, materialSegmentationLayer);
    meshSegmentationLayer.applyMatrix(ctGrayImagesStack._ijk2LPS);
    sceneLayerSegmentation.add(meshSegmentationLayer);
}

function setMixLayer() {
    uniformsLayerMix = AMI.LayerUniformShader.uniforms();
    uniformsLayerMix.uTextureBackTest0.value = sceneLayerCTTextureTarget.texture;
    uniformsLayerMix.uTextureBackTest1.value = sceneLayerSegmentationTextureTarget.texture;

    let fls = new AMI.LayerFragmentShader(uniformsLayerMix);
    let vls = new AMI.LayerVertexShader();
    materialLayerMix = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        uniforms: uniformsLayerMix,
        vertexShader: vls.compute(),
        fragmentShader: fls.compute(),
        transparent: true,
    });
}

function setMeshLayerMix(stackHelper, ctGrayImagesStack) {
    meshLayerMix = new THREE.Mesh(stackHelper.slice.geometry, materialSegmentationLayer);
    meshLayerMix.applyMatrix(ctGrayImagesStack._ijk2LPS);
    sceneLayerMix.add(meshLayerMix);
}

function setLutForGrayImageCTLayer() {
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
    return {lut, lut0};
}

function setLutForSegmentationLayer(segmentationStack, lut, lut0) {
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
}