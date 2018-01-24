'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = buildGUI;

var _helpers = require('base/helpers/helpers.lut');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildGUI(stackHelper, lut, camUtils, camera) {
    var stack = stackHelper._stack;

    var gui = new dat.GUI({
        autoPlace: false
    });

    var customContainer = document.getElementById('my-gui-container');
    customContainer.appendChild(gui.domElement);

    var stackFolder = gui.addFolder('Stack');
    var minWidth = 1;
    var maxWidth = stack.minMax[1] - stack.minMax[0];
    stackFolder.add(stackHelper.slice, 'windowWidth', minWidth, maxWidth).step(1).listen();
    var minCenter = stack.minMax[0];
    var maxCenter = stack.minMax[1];
    stackFolder.add(stackHelper.slice, 'windowCenter', minCenter, maxCenter).step(1).listen();
    stackFolder.add(stackHelper.slice, 'intensityAuto').listen();
    stackFolder.add(stackHelper.slice, 'invert');
    stackFolder.add(stackHelper.slice, 'interpolation', 0, 1).step(1).listen();

    // CREATE LUT
    var domTarget = 'my-lut-canvases';
    var predefinedLut = 'default';
    var modeToCalculateLut = 'linear';
    var color = [[0, 0, 0, 0], [1, 1, 1, 1]];
    var opacity = [[0, 1], [1, 1]];
    lut = new _helpers2.default(domTarget, predefinedLut, modeToCalculateLut, color, opacity);
    lut.luts = _helpers2.default.presetLuts();

    var lutUpdate = stackFolder.add(stackHelper.slice, 'lut', lut.lutsAvailable());
    lutUpdate.onChange(function (value) {
        lut.lut = value;
        stackHelper.slice.lutTexture = lut.texture;
    });
    var lutDiscrete = stackFolder.add(lut, 'discrete', false);
    lutDiscrete.onChange(function (value) {
        lut.discrete = value;
        stackHelper.slice.lutTexture = lut.texture;
    });

    var minIndex = 0;
    var maxIndex = stack.dimensionsIJK.z - 1;
    var index = stackFolder.add(stackHelper, 'index', minIndex, maxIndex).step(1).listen();
    stackFolder.open();

    // camera
    var cameraFolder = gui.addFolder('Camera');
    var invertRows = cameraFolder.add(camUtils, 'invertRows');
    invertRows.onChange(function () {
        camera.invertRows();
        updateLabels(camera.directionsLabel, stack.modality);
    });

    var invertColumns = cameraFolder.add(camUtils, 'invertColumns');
    invertColumns.onChange(function () {
        camera.invertColumns();
        updateLabels(camera.directionsLabel, stack.modality);
    });

    var angle = cameraFolder.add(camera, 'angle', 0, 360).step(1).listen();
    angle.onChange(function () {
        updateLabels(camera.directionsLabel, stack.modality);
    });

    var rotate = cameraFolder.add(camUtils, 'rotate');
    rotate.onChange(function () {
        camera.rotate();
        updateLabels(camera.directionsLabel, stack.modality);
    });

    var orientationUpdate = cameraFolder.add(camUtils, 'orientation', ['default', 'axial', 'coronal', 'sagittal']);
    orientationUpdate.onChange(function (value) {
        camera.orientation = value;
        camera.update();
        camera.fitBox(2);
        stackHelper.orientation = camera.stackOrientation;
        updateLabels(camera.directionsLabel, stack.modality);

        index.__max = stackHelper.orientationMaxIndex;
        var initialSliderIsAtHalf = Math.floor(index.__max / 2);
        stackHelper.index = initialSliderIsAtHalf;
    });

    var conventionUpdate = cameraFolder.add(camUtils, 'convention', ['radio', 'neuro']);
    conventionUpdate.onChange(function (value) {
        camera.convention = value;
        camera.update();
        camera.fitBox(2);
        updateLabels(camera.directionsLabel, stack.modality);
    });
}
//# sourceMappingURL=gui.js.map