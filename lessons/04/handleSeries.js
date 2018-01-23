
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
    segmentationStack.prepare();
    // pixels packing for the fragment shaders now happens there
    segmentationStack.pack();

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

    // create material && mesh then add it to sceneLayerSegmentation
    uniformsLayer1 = AMI.DataUniformShader.uniforms();
    uniformsLayer1.uTextureSize.value = segmentationStack.textureSize;
    uniformsLayer1.uTextureContainer.value = textures2;
    uniformsLayer1.uWorldToData.value = segmentationStack.lps2IJK;
    uniformsLayer1.uNumberOfChannels.value = segmentationStack.numberOfChannels;
    uniformsLayer1.uPixelType.value = segmentationStack.pixelType;
    uniformsLayer1.uBitsAllocated.value = segmentationStack.bitsAllocated;
    uniformsLayer1.uWindowCenterWidth.value = [segmentationStack.windowCenter, segmentationStack.windowWidth];
    uniformsLayer1.uRescaleSlopeIntercept.value = [segmentationStack.rescaleSlope, segmentationStack.rescaleIntercept];
    uniformsLayer1.uDataDimensions.value = [segmentationStack.dimensionsIJK.x, segmentationStack.dimensionsIJK.y, segmentationStack.dimensionsIJK.z];
    uniformsLayer1.uInterpolation.value = 0;

    // generate shaders on-demand!
    var fs = new AMI.DataFragmentShader(uniformsLayer1);
    var vs = new AMI.DataVertexShader();
    materialLayer1 = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        uniforms: uniformsLayer1,
        vertexShader: vs.compute(),
        fragmentShader: fs.compute(),
    });

    // add mesh in this scene with right shaders...
    meshLayer1 = new THREE.Mesh(stackHelper.slice.geometry, materialLayer1);
    // go the LPS space
    meshLayer1.applyMatrix(ctGrayImagesStack._ijk2LPS);
    sceneLayerSegmentation.add(meshLayer1);

    // Create the Mix layer
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

    // add mesh in this scene with right shaders...
    meshLayerMix = new THREE.Mesh(stackHelper.slice.geometry, materialLayer1);
    // go the LPS space
    meshLayerMix.applyMatrix(ctGrayImagesStack._ijk2LPS);
    sceneLayerMix.add(meshLayerMix);

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
    uniformsLayer1.uLut.value = 1;
    uniformsLayer1.uTextureLUT.value = lutLayer1.texture;

    buildGUI(stackHelper);
}