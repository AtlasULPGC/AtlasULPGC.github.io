'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = readMultipleFiles;

var _core = require('base/core/core.utils');

var _core2 = _interopRequireDefault(_core);

var _loaders = require('base/loaders/loaders.volume');

var _loaders2 = _interopRequireDefault(_loaders);

var _handleSeries = require('./handleSeries');

var _handleSeries2 = _interopRequireDefault(_handleSeries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Parse incoming files
 */
function readMultipleFiles(evt, scene, camera, lut, camUtils, controls) {

    var loader = new _loaders2.default(threeD);
    var seriesContainer = [];
    // hide the upload button
    if (evt.target.files.length) {
        document.getElementById('home-container').style.display = 'none';
    }

    /**
     * Load sequence
     */
    function loadSequence(index, files) {
        return Promise.resolve()
        // load the file
        .then(function () {
            return new Promise(function (resolve, reject) {
                var myReader = new FileReader();
                // should handle errors too...
                myReader.addEventListener('load', function (e) {
                    resolve(e.target.result);
                });
                myReader.readAsArrayBuffer(files[index]);
            });
        }).then(function (buffer) {
            return loader.parse({ url: files[index].name, buffer: buffer });
        }).then(function (series) {
            seriesContainer.push(series);
        }).catch(function (error) {
            window.console.log('oops... something went wrong...');
            window.console.log(error);
        });
    }

    /**
     * Load group sequence
     */
    function loadSequenceGroup(files) {
        var fetchSequence = [];

        var _loop = function _loop(i) {
            fetchSequence.push(new Promise(function (resolve, reject) {
                var myReader = new FileReader();
                // should handle errors too...
                myReader.addEventListener('load', function (e) {
                    resolve(e.target.result);
                });
                myReader.readAsArrayBuffer(files[i].file);
            }).then(function (buffer) {
                return { url: files[i].file.name, buffer: buffer };
            }));
        };

        for (var i = 0; i < files.length; i++) {
            _loop(i);
        }

        return Promise.all(fetchSequence).then(function (rawdata) {
            return loader.parse(rawdata);
        }).then(function (series) {
            seriesContainer.push(series);
        }).catch(function (error) {
            window.console.log('oops... something went wrong...');
            window.console.log(error);
        });
    }

    var loadSequenceContainer = [];

    var data = [];
    var dataGroups = [];
    // convert object into array
    for (var i = 0; i < evt.target.files.length; i++) {
        var dataUrl = _core2.default.parseUrl(evt.target.files[i].name);
        if (dataUrl.extension.toUpperCase() === 'MHD' || dataUrl.extension.toUpperCase() === 'RAW') {
            dataGroups.push({
                file: evt.target.files[i],
                extension: dataUrl.extension.toUpperCase()
            });
        } else {
            data.push(evt.target.files[i]);
        }
    }

    // check if some files must be loaded together
    if (dataGroups.length === 2) {
        // if raw/mhd pair
        var mhdFile = dataGroups.filter(_filterByExtension.bind(null, 'MHD'));
        var rawFile = dataGroups.filter(_filterByExtension.bind(null, 'RAW'));
        if (mhdFile.length === 1 && rawFile.length === 1) {
            loadSequenceContainer.push(loadSequenceGroup(dataGroups));
        }
    }

    // load the rest of the files
    for (var _i = 0; _i < data.length; _i++) {
        loadSequenceContainer.push(loadSequence(_i, data));
    }

    // run the load sequence
    // load sequence for all files
    Promise.all(loadSequenceContainer).then(function () {
        (0, _handleSeries2.default)(seriesContainer, loader, scene, camera, lut, camUtils, controls);
    }).catch(function (error) {
        window.console.log('oops... something went wrong...');
        window.console.log(error);
    });
}

function _filterByExtension(extension, item) {
    if (item.extension.toUpperCase() === extension.toUpperCase()) {
        return true;
    }
    return false;
}
//# sourceMappingURL=loader.js.map