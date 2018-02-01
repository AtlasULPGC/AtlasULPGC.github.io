/* globals Stats, dat*/


import CoreUtils from 'base/core/core.utils';
import LoadersVolume from 'base/loaders/loaders.volume';
import {createRenderer3d, setRenderer3D} from "./renderer3d";

import {
    calculateCameraCanvas, centerCamera3dOnStack, setCamera3d,
    setUpCameraWhenInitializingStackHelper
} from './camera3d';
import setRenderer2d from './renderer2d';
import {setCamera2d, update2dViewersWithNewIntersectionPlanes} from './camera2d';
import setControls2d from './controls2d';
import {
    setStackHelper, orientateStackHelperInTheSameDirectionAsTheCamera,
    setInitialStackHelperIndexAtHalf
} from './stackHelper';
import {calculateWorldCenter} from './camera3d';
import {calculateCameraBox} from "./camera3d";
import {initHelpersLocalizer, updateLocalizer} from "./localizerHelper";
import {setURLForData} from "./urlData";
import {centerControlsOnStack, setControls3d} from "./controls3d";
import {setBoundingBoxHelper} from "./boundingBoxHelper";
import {setTextureTargetFor2dPlanesIn3dViewer} from "./texture";
import {setContourHelper} from "./contourHelper";
import {setGui} from "./gui";
import {
    setAxialSlice, setAxialSliceBetweenSagittalAndCoronal, setCoronalSlice, setCoronalSliceBetweenAxialAndSagittal,
    setPlanes,
    setSagittalSlice, setSagittalSliceBetweenAxialAndCoronal
} from "./slicesIn3dRenderer";
import {checkOnWhatRendererHasBeenTriggeredTheEvent, doubleClickIsOnSlice, updateSliceIndex} from "./events";
// standard global variables
let stats;
let ready = false;

let redContourHelper = null;
let redTextureTarget = null;
let redContourScene = null;


// 3d renderer
const renderer3d = createRenderer3d();

// 2d axial renderer
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

// 2d sagittal renderer
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


// 2d coronal renderer
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

// data to be loaded
let dataInfo = [
    ['adi1', {
        location:
            'https://cdn.rawgit.com/FNNDSC/data/master/dicom/adi_brain/mesh.stl',
        label: 'Left',
        loaded: false,
        material: null,
        materialFront: null,
        materialBack: null,
        mesh: null,
        meshFront: null,
        meshBack: null,
        color: 0xe91e63,
        opacity: 0.7,
    }],
    ['adi2', {
        location:
            'https://cdn.rawgit.com/FNNDSC/data/master/dicom/adi_brain/mesh2.stl',
        label: 'Right',
        loaded: false,
        material: null,
        materialFront: null,
        materialBack: null,
        mesh: null,
        meshFront: null,
        meshBack: null,
        color: 0x03a9f4,
        opacity: 1,
    }],
];

let data = new Map(dataInfo);

// extra variables to show mesh plane intersections in 2D renderers
let sceneClip = new THREE.Scene();
let axialIntersectionPlane = new THREE.Plane(new THREE.Vector3(0, 0, 0), 0);
let sagittalIntersectionPlane = new THREE.Plane(new THREE.Vector3(0, 0, 0), 0);
let coronalIntersectionPlane = new THREE.Plane(new THREE.Vector3(0, 0, 0), 0);

function initRenderer3D(renderObj) {


// renderer
    setRenderer3D(renderObj);


// camera
    setCamera3d(renderObj);


// controls
    setControls3d(renderObj);

    // scene
    renderObj.scene = new THREE.Scene();

    // light
    renderObj.light = new THREE.DirectionalLight(0xffffff, 1);
    renderObj.light.position.copy(renderObj.camera.position);
    renderObj.scene.add(renderObj.light);

    // stats
    stats = new Stats();
    renderObj.domElement.appendChild(stats.domElement);
}

function initRenderer2D(rendererObj) {

// renderer
    setRenderer2d(rendererObj);


// camera
    setCamera2d(rendererObj);


// controls
    setControls2d(rendererObj);

    // scene
    rendererObj.scene = new THREE.Scene();
}

function initHelpersStack(rendererObj, stack) {


    setStackHelper(rendererObj, stack);


// set camera
    let lpsDims = calculateWorldCenter(stack);


// box: {halfDimensions, center}
    let box = calculateCameraBox(stack, lpsDims);


// init and zoom
    let canvas = calculateCameraCanvas(rendererObj);


    setUpCameraWhenInitializingStackHelper(rendererObj, stack, box, canvas);


    orientateStackHelperInTheSameDirectionAsTheCamera(rendererObj);


    setInitialStackHelperIndexAtHalf(rendererObj);
    rendererObj.scene.add(rendererObj.stackHelper);
}


/**
 * Init the quadview
 */
function init() {
    /**
     * Called on each animation frame
     */
    function animate() {
        // we are ready when both meshes have been loaded
        if (ready) {
            // render
            renderer3d.controls.update();
            axialRenderer.controls.update();
            sagittalRenderer.controls.update();
            coronalRenderer.controls.update();

            renderer3d.light.position.copy(renderer3d.camera.position);
            renderer3d.renderer.render(renderer3d.scene, renderer3d.camera);

            // r1
            axialRenderer.renderer.clear();
            axialRenderer.renderer.render(axialRenderer.scene, axialRenderer.camera);
            // mesh
            axialRenderer.renderer.clearDepth();
            data.forEach(function (object, key) {
                object.materialFront.clippingPlanes = [axialIntersectionPlane];
                object.materialBack.clippingPlanes = [axialIntersectionPlane];
                axialRenderer.renderer.render(object.scene, axialRenderer.camera, redTextureTarget, true);
                axialRenderer.renderer.clearDepth();
                redContourHelper.contourWidth = object.selected ? 1 : 1;
                redContourHelper.contourOpacity = object.selected ? 1 : .2;
                axialRenderer.renderer.render(redContourScene, axialRenderer.camera);
                axialRenderer.renderer.clearDepth();
            });

            // localizer
            axialRenderer.renderer.clearDepth();
            axialRenderer.renderer.render(axialRenderer.localizerScene, axialRenderer.camera);

            // r2
            sagittalRenderer.renderer.clear();
            sagittalRenderer.renderer.render(sagittalRenderer.scene, sagittalRenderer.camera);
            // mesh
            sagittalRenderer.renderer.clearDepth();
            data.forEach(function (object, key) {
                object.materialFront.clippingPlanes = [sagittalIntersectionPlane];
                object.materialBack.clippingPlanes = [sagittalIntersectionPlane];
            });
            sagittalRenderer.renderer.render(sceneClip, sagittalRenderer.camera);
            // localizer
            sagittalRenderer.renderer.clearDepth();
            sagittalRenderer.renderer.render(sagittalRenderer.localizerScene, sagittalRenderer.camera);

            // r3
            coronalRenderer.renderer.clear();
            coronalRenderer.renderer.render(coronalRenderer.scene, coronalRenderer.camera);
            // mesh
            coronalRenderer.renderer.clearDepth();
            data.forEach(function (object, key) {
                object.materialFront.clippingPlanes = [coronalIntersectionPlane];
                object.materialBack.clippingPlanes = [coronalIntersectionPlane];
            });
            coronalRenderer.renderer.render(sceneClip, coronalRenderer.camera);
            // localizer
            coronalRenderer.renderer.clearDepth();
            coronalRenderer.renderer.render(coronalRenderer.localizerScene, coronalRenderer.camera);
        }

        stats.update();

        // request new frame
        requestAnimationFrame(function () {
            animate();
        });
    }

    // renderers
    initRenderer3D(renderer3d);
    initRenderer2D(axialRenderer);
    initRenderer2D(sagittalRenderer);
    initRenderer2D(coronalRenderer);

    // start rendering loop
    animate();
}

window.onload = function () {
    // init threeJS
    init();


    let files = setURLForData();

    // load sequence for each file
    // instantiate the loader
    // it loads and parses the dicom image
    let loader = new LoadersVolume();
    loader.load(files)
        .then(function () {
            let series = loader.data[0].mergeSeries(loader.data)[0];
            loader.free();
            loader = null;
            // get first stack from series
            let stack = series.stack[0];
            stack.prepare();

            let centerLPS = centerCamera3dOnStack(stack, renderer3d);


            centerControlsOnStack(centerLPS, renderer3d);


// bouding box
            setBoundingBoxHelper(stack, renderer3d);


// red slice
            setAxialSlice(axialRenderer, stack, renderer3d);


            redTextureTarget = setTextureTargetFor2dPlanesIn3dViewer(redTextureTarget, axialRenderer);
            redContourHelper = setContourHelper(redContourHelper, stack, axialRenderer, redTextureTarget);
            redContourScene = new THREE.Scene();
            redContourScene.add(redContourHelper);


// yellow slice
            setSagittalSlice(sagittalRenderer, stack, renderer3d);


// green slice
            setCoronalSlice(coronalRenderer, stack, renderer3d);


// create new mesh with Localizer shaders
            let {axialPlane, sagittalPlane, coronalPlane} = setPlanes(axialRenderer, sagittalRenderer, coronalRenderer);


// localizer red slice
            setAxialSliceBetweenSagittalAndCoronal(axialRenderer, stack, axialPlane, sagittalPlane, sagittalRenderer, coronalPlane, coronalRenderer);


// localizer yellow slice
            setSagittalSliceBetweenAxialAndCoronal(sagittalRenderer, stack, sagittalPlane, axialPlane, axialRenderer, coronalPlane, coronalRenderer);


// localizer green slice
            setCoronalSliceBetweenAxialAndSagittal(coronalRenderer, stack, coronalPlane, axialPlane, axialRenderer, sagittalPlane, sagittalRenderer);
            let {redChanged: axialChanged, yellowChanged: sagittalChanged, greenChanged: coronalChanged} = setGui(axialRenderer, sagittalRenderer, coronalRenderer);

            /**
             * Update Layer Mix
             */




            function onSagittalChanged() {
                updateLocalizer(sagittalRenderer, [axialRenderer.localizerHelper, coronalRenderer.localizerHelper]);
                update2dViewersWithNewIntersectionPlanes(sagittalRenderer, sagittalIntersectionPlane);
            }

            sagittalChanged.onChange(onSagittalChanged);

            function onAxialChanged() {
                updateLocalizer(axialRenderer, [sagittalRenderer.localizerHelper, coronalRenderer.localizerHelper]);
                update2dViewersWithNewIntersectionPlanes(axialRenderer, axialIntersectionPlane);

                if (redContourHelper) {
                    redContourHelper.geometry = axialRenderer.stackHelper.slice.geometry;
                }
            }

            axialChanged.onChange(onAxialChanged);

            function onCoronalChanged() {
                updateLocalizer(coronalRenderer, [axialRenderer.localizerHelper, sagittalRenderer.localizerHelper]);
                update2dViewersWithNewIntersectionPlanes(coronalRenderer, coronalIntersectionPlane);
            }

            coronalChanged.onChange(onCoronalChanged);

            function onDoubleClick(event) {


                const doubleClickInfo = checkOnWhatRendererHasBeenTriggeredTheEvent(event, renderer3d, axialRenderer, sagittalRenderer, coronalRenderer);
                const mouse = doubleClickInfo.mouse;
                let camera = doubleClickInfo.camera;
                let stackHelper = doubleClickInfo.stackHelper;
                let scene = doubleClickInfo.scene;

                const raycaster = new THREE.Raycaster();
                raycaster.setFromCamera(mouse, camera);

                const intersects = raycaster.intersectObjects(scene.children, true);


                if (doubleClickIsOnSlice(intersects)) {
                    let ijk = CoreUtils.worldToData(stackHelper.stack.lps2IJK, intersects[0].point);
                    updateSliceIndex(ijk, axialRenderer, sagittalRenderer, coronalRenderer);

                    onCoronalChanged();
                    onAxialChanged();
                    onSagittalChanged();
                }
            }

            // event listeners
            renderer3d.domElement.addEventListener('dblclick', onDoubleClick);
            axialRenderer.domElement.addEventListener('dblclick', onDoubleClick);
            sagittalRenderer.domElement.addEventListener('dblclick', onDoubleClick);
            coronalRenderer.domElement.addEventListener('dblclick', onDoubleClick);

            function onClick(event) {
                const canvas = event.target.parentElement;
                const id = event.target.id;
                const mouse = {
                    x: ((event.clientX - canvas.offsetLeft) / canvas.clientWidth) * 2 - 1,
                    y: -((event.clientY - canvas.offsetTop) / canvas.clientHeight) * 2 + 1,
                };
                //
                let camera = null;
                let stackHelper = null;
                let scene = null;
                switch (id) {
                    case '0':
                        camera = renderer3d.camera;
                        stackHelper = axialRenderer.stackHelper;
                        scene = renderer3d.scene;
                        break;
                    case '1':
                        camera = axialRenderer.camera;
                        stackHelper = axialRenderer.stackHelper;
                        scene = axialRenderer.scene;
                        break;
                    case '2':
                        camera = sagittalRenderer.camera;
                        stackHelper = sagittalRenderer.stackHelper;
                        scene = sagittalRenderer.scene;
                        break;
                    case '3':
                        camera = coronalRenderer.camera;
                        stackHelper = coronalRenderer.stackHelper;
                        scene = coronalRenderer.scene;
                        break;
                }

                const raycaster = new THREE.Raycaster();
                raycaster.setFromCamera(mouse, camera);

                const intersects = raycaster.intersectObjects(scene.children, true);
                if (intersects.length > 0) {
                    if (intersects[0].object && intersects[0].object.objRef) {
                        const refObject = intersects[0].object.objRef;
                        refObject.selected = !refObject.selected;

                        let color = refObject.color;
                        if (refObject.selected) {
                            color = 0xCCFF00;
                        }

                        // update materials colors
                        refObject.material.color.setHex(color);
                        refObject.materialFront.color.setHex(color);
                        refObject.materialBack.color.setHex(color);
                    }
                }
            }

            renderer3d.domElement.addEventListener('click', onClick);

            function onScroll(event) {
                const id = event.target.domElement.id;
                let stackHelper = null;
                switch (id) {
                    case 'r1':
                        stackHelper = axialRenderer.stackHelper;
                        break;
                    case 'r2':
                        stackHelper = sagittalRenderer.stackHelper;
                        break;
                    case 'r3':
                        stackHelper = coronalRenderer.stackHelper;
                        break;
                }

                if (event.delta > 0) {
                    if (stackHelper.index >= stackHelper.orientationMaxIndex - 1) {
                        return false;
                    }
                    stackHelper.index += 1;
                } else {
                    if (stackHelper.index <= 0) {
                        return false;
                    }
                    stackHelper.index -= 1;
                }

                onCoronalChanged();
                onAxialChanged();
                onSagittalChanged();
            }

            // event listeners
            axialRenderer.controls.addEventListener('OnScroll', onScroll);
            sagittalRenderer.controls.addEventListener('OnScroll', onScroll);
            coronalRenderer.controls.addEventListener('OnScroll', onScroll);

            function windowResize2D(rendererObj) {
                rendererObj.camera.canvas = {
                    width: rendererObj.domElement.clientWidth,
                    height: rendererObj.domElement.clientHeight,
                };
                rendererObj.camera.fitBox(2, 1);
                rendererObj.renderer.setSize(
                    rendererObj.domElement.clientWidth,
                    rendererObj.domElement.clientHeight);

                // update info to draw borders properly
                rendererObj.stackHelper.slice.canvasWidth =
                    rendererObj.domElement.clientWidth;
                rendererObj.stackHelper.slice.canvasHeight =
                    rendererObj.domElement.clientHeight;
                rendererObj.localizerHelper.canvasWidth =
                    rendererObj.domElement.clientWidth;
                rendererObj.localizerHelper.canvasHeight =
                    rendererObj.domElement.clientHeight;
            }

            function onWindowResize() {
                // update 3D
                renderer3d.camera.aspect = renderer3d.domElement.clientWidth / renderer3d.domElement.clientHeight;
                renderer3d.camera.updateProjectionMatrix();
                renderer3d.renderer.setSize(
                    renderer3d.domElement.clientWidth, renderer3d.domElement.clientHeight);

                // update 2d
                windowResize2D(axialRenderer);
                windowResize2D(sagittalRenderer);
                windowResize2D(coronalRenderer);
            }

            window.addEventListener('resize', onWindowResize, false);
            // load meshes on the stack is all set
            let meshesLoaded = 0;

            function loadSTLObject(object) {
                const stlLoader = new THREE.STLLoader();
                stlLoader.load(object.location, function (geometry) {
                    // 3D mesh
                    object.material = new THREE.MeshLambertMaterial({
                        opacity: object.opacity,
                        color: object.color,
                        clippingPlanes: [],
                        transparent: true,
                    });
                    object.mesh = new THREE.Mesh(geometry, object.material);
                    object.mesh.objRef = object;
                    const RASToLPS = new THREE.Matrix4();
                    RASToLPS.set(-1, 0, 0, 0,
                        0, -1, 0, 0,
                        0, 0, 1, 0,
                        0, 0, 0, 1);
                    // object.mesh.applyMatrix(RASToLPS);
                    renderer3d.scene.add(object.mesh);

                    object.scene = new THREE.Scene();

                    // front
                    object.materialFront = new THREE.MeshBasicMaterial({
                        color: object.color,
                        side: THREE.FrontSide,
                        depthWrite: true,
                        opacity: 0,
                        transparent: true,
                        clippingPlanes: [],
                    });

                    object.meshFront = new THREE.Mesh(geometry, object.materialFront);
                    // object.meshFront.applyMatrix(RASToLPS);
                    object.scene.add(object.meshFront);

                    // back
                    object.materialBack = new THREE.MeshBasicMaterial({
                        color: object.color,
                        side: THREE.BackSide,
                        depthWrite: true,
                        opacity: object.opacity,
                        transparent: true,
                        clippingPlanes: [],
                    });

                    object.meshBack = new THREE.Mesh(geometry, object.materialBack);
                    // object.meshBack.applyMatrix(RASToLPS);
                    object.scene.add(object.meshBack);
                    sceneClip.add(object.scene);

                    meshesLoaded++;

                    onCoronalChanged();
                    onAxialChanged();
                    onSagittalChanged();

                    // good to go
                    if (meshesLoaded === data.size) {
                        ready = true;
                    }
                });
            }

            data.forEach(function (object, key) {
                loadSTLObject(object);
            });
        })
        .catch(function (error) {
            window.console.log('oops... something went wrong...');
            window.console.log(error);
        });
};
export {initHelpersStack};