import HelpersLut from 'base/helpers/helpers.lut';


export default function buildGUI(stackHelper, lut, camUtils, camera) {
    let stack = stackHelper._stack;
    let gui = setDataObjectToAssociateBrowserVariableAndUserInterface();

    let customContainer = document.getElementById('my-gui-container');
    customContainer.appendChild(gui.domElement);

    let stackFolder = setStackFolder(gui, stack, stackHelper);

    setLUT(lut, stackFolder, stackHelper);

    setCameraFolder(gui, camUtils, camera, stack, stackHelper);
}

function setDataObjectToAssociateBrowserVariableAndUserInterface() {
    let gui = new dat.GUI({
        autoPlace: false,
    });
    return gui;
}

function setStackFolder(gui, stack, stackHelper) {
    let stackFolder = gui.addFolder('Stack');
    const minWidth = 1;
    const maxWidth = stack.minMax[1] - stack.minMax[0];
    stackFolder.add(
        stackHelper.slice, 'windowWidth', minWidth, maxWidth)
        .step(1).listen();

    const minCenter = stack.minMax[0];
    const maxCenter = stack.minMax[1];
    stackFolder.add(
        stackHelper.slice, 'windowCenter', minCenter, maxCenter)
        .step(1).listen();

    stackFolder.add(stackHelper.slice, 'intensityAuto').listen();
    stackFolder.add(stackHelper.slice, 'invert');
    stackFolder.add(stackHelper.slice, 'interpolation', 0, 1).step(1).listen();

    const minIndex = 0;
    const maxIndex = stack.dimensionsIJK.z - 1;
    let index = stackFolder.add(
        stackHelper, 'index', minIndex, maxIndex).step(1).listen();
    stackFolder.open();
    return stackFolder;
}

function setLUT(lut, stackFolder, stackHelper) {
    const domTarget = 'my-lut-canvases';
    const predefinedLut = 'default';
    const modeToCalculateLut = 'linear';
    const color = [[0, 0, 0, 0], [1, 1, 1, 1]];
    const opacity = [[0, 1], [1, 1]];
    lut = new HelpersLut(
        domTarget,
        predefinedLut,
        modeToCalculateLut,
        color,
        opacity);
    lut.luts = HelpersLut.presetLuts();

    let lutUpdate = stackFolder.add(
        stackHelper.slice, 'lut', lut.lutsAvailable());
    lutUpdate.onChange(function (value) {
        lut.lut = value;
        stackHelper.slice.lutTexture = lut.texture;
    });
    let lutDiscrete = stackFolder.add(lut, 'discrete', false);
    lutDiscrete.onChange(function (value) {
        lut.discrete = value;
        stackHelper.slice.lutTexture = lut.texture;
    });
}

function setCameraFolder(gui, camUtils, camera, stack, stackHelper) {
    let cameraFolder = gui.addFolder('Camera');
    let invertRows = cameraFolder.add(camUtils, 'invertRows');
    invertRows.onChange(function () {
        camera.invertRows();
        updateLabels(camera.directionsLabel, stack.modality);
    });

    let invertColumns = cameraFolder.add(camUtils, 'invertColumns');
    invertColumns.onChange(function () {
        camera.invertColumns();
        updateLabels(camera.directionsLabel, stack.modality);
    });

    let angle = cameraFolder.add(camera, 'angle', 0, 360).step(1).listen();
    angle.onChange(function () {
        updateLabels(camera.directionsLabel, stack.modality);
    });

    let rotate = cameraFolder.add(camUtils, 'rotate');
    rotate.onChange(function () {
        camera.rotate();
        updateLabels(camera.directionsLabel, stack.modality);
    });

    let orientationUpdate = cameraFolder.add(
        camUtils, 'orientation', ['default', 'axial', 'coronal', 'sagittal']);
    orientationUpdate.onChange(function (value) {
        camera.orientation = value;
        camera.update();
        camera.fitBox(2);
        stackHelper.orientation = camera.stackOrientation;
        updateLabels(camera.directionsLabel, stack.modality);

        index.__max = stackHelper.orientationMaxIndex;
        const initialSliderIsAtHalf = Math.floor(index.__max / 2);
        stackHelper.index = initialSliderIsAtHalf;
    });

    let conventionUpdate = cameraFolder.add(
        camUtils, 'convention', ['radio', 'neuro']);
    conventionUpdate.onChange(function (value) {
        camera.convention = value;
        camera.update();
        camera.fitBox(2);
        updateLabels(camera.directionsLabel, stack.modality);
    });
}