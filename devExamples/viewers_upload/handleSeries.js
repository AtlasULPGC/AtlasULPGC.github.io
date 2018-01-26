import HelpersStack from 'base/helpers/helpers.stack';
import buildGUI from './gui';

function cleanLoaderAndProgressBar(loader) {
    loader.free();
    loader = null;
}

function coordinatesToCenterCamera(stack) {
    let worldbb = stack.worldBoundingBox();
    const xAxisCenter = (worldbb[1] - worldbb[0]) / 2;
    const yAxisCenter = (worldbb[3] - worldbb[2]) / 2;
    const zAxisCenter = (worldbb[5] - worldbb[4]) / 2;
    let lpsDims = new THREE.Vector3(
        xAxisCenter,
        yAxisCenter,
        zAxisCenter
    );
    return lpsDims;
}

function setCameraLens(stack, lpsDims) {
    let box = {
        center: stack.worldCenter().clone(),
        halfDimensions:
            new THREE.Vector3(lpsDims.x + 10, lpsDims.y + 10, lpsDims.z + 10),
    };
    return box;
}

function setCanvas() {
    let canvas = {
        width: threeD.clientWidth,
        height: threeD.clientHeight,
    };
    return canvas;
}

function setCameraAfterImagesLoad(camera, stack, box, canvas) {
    camera.directions = [stack.xCosine, stack.yCosine, stack.zCosine];
    camera.box = box;
    camera.canvas = canvas;
    camera.update();
    camera.fitBox(2);
    updateLabels(camera.directionsLabel, stack.modality);
}

/**
 * Visulaize incoming data
 */
export default function handleSeries(seriesContainer, loader, scene, camera, lut, camUtils, controls) {

    cleanLoaderAndProgressBar(loader);
    let stack = seriesContainer[0].mergeSeries(seriesContainer)[0].stack[0];

    let stackHelper = new HelpersStack(stack);
    stackHelper.bbox.visible = false;
    stackHelper.borderColor = '#2196F3';
    stackHelper.border.visible = false;
    scene.add(stackHelper);


    let lpsDims = coordinatesToCenterCamera(stack);
    let box = setCameraLens(stack, lpsDims);
    let canvas = setCanvas();

    setCameraAfterImagesLoad(camera, stack, box, canvas);
    buildGUI(stackHelper, lut, camUtils, camera);
    hookCallbacks(stackHelper, controls, camera);
}