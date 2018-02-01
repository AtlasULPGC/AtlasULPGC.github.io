function create2dAxialRenderer() {
    const axialRenderer = {
        domId: 'r1',
        domElement: null,
        renderer: null,
        color: 0x121212,
        sliceOrientation: 'axial',
        sliceColor: 0xFF1744,
        targetID: 1,
        camera: null,
        controls: null,
        scene: null,
        light: null,
        stackHelper: null,
        localizerHelper: null,
        localizerScene: null,
    };
    return axialRenderer;
}

 function setRenderer2d(rendererObj) {
    rendererObj.domElement = document.getElementById(rendererObj.domId);
    rendererObj.renderer = new THREE.WebGLRenderer({
        antialias: true,
    });
    rendererObj.renderer.autoClear = false;
    rendererObj.renderer.localClippingEnabled = true;
    rendererObj.renderer.setSize(
        rendererObj.domElement.clientWidth, rendererObj.domElement.clientHeight);
    rendererObj.renderer.setClearColor(0x121212, 1);
    rendererObj.renderer.domElement.id = rendererObj.targetID;
    rendererObj.domElement.appendChild(rendererObj.renderer.domElement);
}

export {create2dAxialRenderer, setRenderer2d};