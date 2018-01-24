'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = startReadingFromFilesInputOnChangeEvent;

var _loader = require('./loader');

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function startReadingFromFilesInputOnChangeEvent(scene, camera, lut, camUtils, controls) {
    document.getElementById('filesinput').addEventListener('change', function (event) {
        (0, _loader2.default)(event, scene, camera, lut, camUtils, controls);
    }, false);
}
//# sourceMappingURL=readingEventFromFilesInput.js.map