function setCTLayerTexture() {
    sceneLayerCTTextureTarget = new THREE.WebGLRenderTarget(threeD.clientWidth, threeD.clientHeight, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
    });
}