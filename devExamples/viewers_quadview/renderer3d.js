export default function setRenderer3D(renderObj) {
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