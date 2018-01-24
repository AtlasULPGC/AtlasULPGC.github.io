'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = setCamera;

var _cameras = require('base/cameras/cameras.orthographic');

var _cameras2 = _interopRequireDefault(_cameras);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setCamera() {
    var camera = new _cameras2.default(threeD.clientWidth / -2, threeD.clientWidth / 2, threeD.clientHeight / 2, threeD.clientHeight / -2, 0.1, 10000);
    return camera;
}
//# sourceMappingURL=camera.js.map