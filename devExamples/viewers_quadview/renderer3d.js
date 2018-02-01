
function createRenderer3d() {
    const renderer3d = {
        domId: 'r0',
        domElement: null,
        renderer: null,
        color: 0x212121,
        targetID: 0,
        camera: null,
        controls: null,
        scene: null,
        light: null,
    };
    return renderer3d;
}

 function setRenderer3D(renderObj) {
    renderObj.domElement = document.getElementById(renderObj.domId);
    renderObj.renderer = new THREE.WebGLRenderer({
        antialias: true,
    });
    renderObj.renderer.setSize(
        renderObj.domElement.clientWidth, renderObj.domElement.clientHeight);
    renderObj.renderer.setClearColor(renderObj.color, 1);
    renderObj.renderer.domElement.id = renderObj.targetID;
    renderObj.domElement.appendChild(renderObj.renderer.domElement);
}
export {createRenderer3d, setRenderer3D};