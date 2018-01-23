function setScene() {
// scene
    sceneLayer0 = new THREE.Scene();
    sceneLayer1 = new THREE.Scene();
    sceneLayerMix = new THREE.Scene();

    // render to texture!!!!
    sceneLayerCTTextureTarget = new THREE.WebGLRenderTarget(threeD.clientWidth, threeD.clientHeight, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
    });

    sceneLayerSegmentationTextureTarget = new THREE.WebGLRenderTarget(threeD.clientWidth, threeD.clientHeight, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
    });
}