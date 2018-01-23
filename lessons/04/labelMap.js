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

