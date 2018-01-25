export default function setRenderer2d(rendererObj) {
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
