'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = setControls;

var _controls = require('base/controls/controls.trackballortho');

var _controls2 = _interopRequireDefault(_controls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setControls(controls, camera) {
    controls = new _controls2.default(camera, threeD);
    controls.staticMoving = true;
    controls.noRotate = true;
    camera.controls = controls;
    return controls;
}
//# sourceMappingURL=controls.js.map