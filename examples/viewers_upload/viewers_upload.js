'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* globals dat*/

var _camera = require('./camera');

var _camera2 = _interopRequireDefault(_camera);

var _controls = require('./controls');

var _controls2 = _interopRequireDefault(_controls);

var _readingEventFromFilesInput = require('./readingEventFromFilesInput');

var _readingEventFromFilesInput2 = _interopRequireDefault(_readingEventFromFilesInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderer = void 0;
var threeD = void 0;

var _setRenderer = setRenderer();

var _setRenderer2 = _slicedToArray(_setRenderer, 2);

threeD = _setRenderer2[0];
renderer = _setRenderer2[1];

var camera = (0, _camera2.default)();
var controls = (0, _controls2.default)(controls, camera);
var scene = void 0;
var lut = void 0;

var camUtils = {
    invertRows: false,
    invertColumns: false,
    rotate: false,
    orientation: 'default',
    convention: 'radio'
};

function init() {

    function animate() {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(function () {
            animate();
        });
    }

    scene = new THREE.Scene();
    animate();
}

window.onload = function () {
    setLoadButtonWithFileInput();
    init();
    (0, _readingEventFromFilesInput2.default)(scene, camera, lut, camUtils, controls);
};
//# sourceMappingURL=viewers_upload.js.map