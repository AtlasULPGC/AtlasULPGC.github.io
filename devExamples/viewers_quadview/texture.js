function setTextureTargetFor2dPlanesIn3dViewer(redTextureTarget, r1) {
    redTextureTarget = new THREE.WebGLRenderTarget(
        r1.domElement.clientWidth,
        r1.domElement.clientHeight,
        {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBAFormat,
        }
    );
    return redTextureTarget;
}

export {setTextureTargetFor2dPlanesIn3dViewer};