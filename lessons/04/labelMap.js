function prepareStackToCreateLabelMap(segmentationStack) {
    segmentationStack.prepare();
    segmentationStack.pack();
}

function setRawTextureForLabelMap(segmentationStack) {
    var textures2 = [];
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
        textures2.push(tex);
    }
    return textures2;
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