'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = handleSeries;

var _helpers = require('base/helpers/helpers.stack');

var _helpers2 = _interopRequireDefault(_helpers);

var _gui = require('./gui');

var _gui2 = _interopRequireDefault(_gui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Visulaize incoming data
 */
function handleSeries(seriesContainer, loader, scene, camera, lut, camUtils, controls) {
    // cleanup the loader and its progress bar
    loader.free();
    loader = null;
    // prepare for slice visualization
    // first stack of first series
    var stack = seriesContainer[0].mergeSeries(seriesContainer)[0].stack[0];

    var stackHelper = new _helpers2.default(stack);
    stackHelper.bbox.visible = false;
    stackHelper.borderColor = '#2196F3';
    stackHelper.border.visible = false;
    scene.add(stackHelper);

    console.log(stackHelper.stack);

    // set camera
    var worldbb = stack.worldBoundingBox();
    var lpsDims = new THREE.Vector3((worldbb[1] - worldbb[0]) / 2, (worldbb[3] - worldbb[2]) / 2, (worldbb[5] - worldbb[4]) / 2);

    // box: {halfDimensions, center}
    var box = {
        center: stack.worldCenter().clone(),
        halfDimensions: new THREE.Vector3(lpsDims.x + 10, lpsDims.y + 10, lpsDims.z + 10)
    };

    // init and zoom
    var canvas = {
        width: threeD.clientWidth,
        height: threeD.clientHeight
    };

    camera.directions = [stack.xCosine, stack.yCosine, stack.zCosine];
    camera.box = box;
    camera.canvas = canvas;
    camera.update();
    camera.fitBox(2);
    updateLabels(camera.directionsLabel, stack.modality);
    (0, _gui2.default)(stackHelper, lut, camUtils, camera);
    hookCallbacks(stackHelper, controls, camera);
}
//# sourceMappingURL=handleSeries.js.map