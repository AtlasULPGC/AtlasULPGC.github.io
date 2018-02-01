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

function create2dSagittalRenderer() {
    const sagittalRenderer = {
        domId: 'r2',
        domElement: null,
        renderer: null,
        color: 0x121212,
        sliceOrientation: 'sagittal',
        sliceColor: 0xFFEA00,
        targetID: 2,
        camera: null,
        controls: null,
        scene: null,
        light: null,
        stackHelper: null,
        localizerHelper: null,
        localizerScene: null,
    };
    return sagittalRenderer;
}

function create2dCoronalRenderer() {
    const coronalRenderer = {
        domId: 'r3',
        domElement: null,
        renderer: null,
        color: 0x121212,
        sliceOrientation: 'coronal',
        sliceColor: 0x76FF03,
        targetID: 3,
        camera: null,
        controls: null,
        scene: null,
        light: null,
        stackHelper: null,
        localizerHelper: null,
        localizerScene: null,
    };
    return coronalRenderer;
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

function set2dIntersectionPlanes() {
    const vector3Normal = new THREE.Vector3(0, 0, 0);
    const distanceFromOriginToPlane = 0;
    let axialIntersectionPlane = new THREE.Plane(vector3Normal, distanceFromOriginToPlane);
    let sagittalIntersectionPlane = new THREE.Plane(vector3Normal, distanceFromOriginToPlane);
    let coronalIntersectionPlane = new THREE.Plane(vector3Normal, distanceFromOriginToPlane);
    return {axialIntersectionPlane, sagittalIntersectionPlane, coronalIntersectionPlane};
}

function showAxial2dRenderer(axialRenderer) {
    axialRenderer.renderer.clear();
    axialRenderer.renderer.render(axialRenderer.scene, axialRenderer.camera);
}

export {
    create2dAxialRenderer,
    setRenderer2d,
    create2dSagittalRenderer,
    create2dCoronalRenderer,
    set2dIntersectionPlanes,
    showAxial2dRenderer
};