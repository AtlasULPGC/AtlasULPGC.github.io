import HelpersStack from 'base/helpers/helpers.stack';
import buildGUI from './gui';

/**
 * Visulaize incoming data
 */
export default function handleSeries(seriesContainer, loader, scene, camera, lut, camUtils, controls) {
    // cleanup the loader and its progress bar
    loader.free();
    loader = null;
    // prepare for slice visualization
    // first stack of first series
    let stack = seriesContainer[0].mergeSeries(seriesContainer)[0].stack[0];

    let stackHelper = new HelpersStack(stack);
    stackHelper.bbox.visible = false;
    stackHelper.borderColor = '#2196F3';
    stackHelper.border.visible = false;
    scene.add(stackHelper);

    console.log(stackHelper.stack);

    // set camera
    let worldbb = stack.worldBoundingBox();
    let lpsDims = new THREE.Vector3(
        (worldbb[1] - worldbb[0]) / 2,
        (worldbb[3] - worldbb[2]) / 2,
        (worldbb[5] - worldbb[4]) / 2
    );

    // box: {halfDimensions, center}
    let box = {
        center: stack.worldCenter().clone(),
        halfDimensions:
            new THREE.Vector3(lpsDims.x + 10, lpsDims.y + 10, lpsDims.z + 10),
    };

    // init and zoom
    let canvas = {
        width: threeD.clientWidth,
        height: threeD.clientHeight,
    };

    camera.directions = [stack.xCosine, stack.yCosine, stack.zCosine];
    camera.box = box;
    camera.canvas = canvas;
    camera.update();
    camera.fitBox(2);
    updateLabels(camera.directionsLabel, stack.modality);
    buildGUI(stackHelper, lut, camUtils, camera);
    hookCallbacks(stackHelper, controls, camera);
}