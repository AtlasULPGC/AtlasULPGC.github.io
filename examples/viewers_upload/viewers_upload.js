/* globals dat*/
import CoreUtils from 'base/core/core.utils';
import LoadersVolume from 'base/loaders/loaders.volume';
import HelpersStack from 'base/helpers/helpers.stack';
import buildGUI from './gui';
import setCamera from './camera';
import setControls from './controls';
// standard global variables
let renderer;
let threeD;
[threeD, renderer] = setRenderer();
let camera = setCamera();
let controls = setControls(controls, camera);
let scene;
let lut;


// probe
let camUtils = {
    invertRows: false,
    invertColumns: false,
    rotate: false,
    orientation: 'default',
    convention: 'radio',
};


/**
 * Init the scene
 */
function init() {
    /**
     * Animation loop
     */
    function animate() {
        // render
        controls.update();
        renderer.render(scene, camera);

        // request new frame
        requestAnimationFrame(function () {
            animate();
        });
    }

    // renderer


    // scene
    scene = new THREE.Scene();
    // camera


    // controls


    animate();
}



window.onload = function () {
    // hookup load button
    setLoadButtonWithFileInput();

    // init threeJS...
    init();


    /**
     * Visulaize incoming data
     */
    function handleSeries(seriesContainer) {
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

    let loader = new LoadersVolume(threeD);
    let seriesContainer = [];

    /**
     * Filter array of data by extension
     * extension {String}
     * item {Object}
     * @return {Boolean}
     */
    function _filterByExtension(extension, item) {
        if (item.extension.toUpperCase() === extension.toUpperCase()) {
            return true;
        }
        return false;
    }

    /**
     * Parse incoming files
     */
    function readMultipleFiles(evt) {
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
                        let myReader = new FileReader();
                        // should handle errors too...
                        myReader.addEventListener('load', function (e) {
                            resolve(e.target.result);
                        });
                        myReader.readAsArrayBuffer(files[index]);
                    });
                })
                .then(function (buffer) {
                    return loader.parse({url: files[index].name, buffer});
                })
                .then(function (series) {
                    seriesContainer.push(series);
                })
                .catch(function (error) {
                    window.console.log('oops... something went wrong...');
                    window.console.log(error);
                });
        }

        /**
         * Load group sequence
         */
        function loadSequenceGroup(files) {
            const fetchSequence = [];

            for (let i = 0; i < files.length; i++) {
                fetchSequence.push(
                    new Promise((resolve, reject) => {
                        const myReader = new FileReader();
                        // should handle errors too...
                        myReader.addEventListener('load', function (e) {
                            resolve(e.target.result);
                        });
                        myReader.readAsArrayBuffer(files[i].file);
                    })
                        .then(function (buffer) {
                            return {url: files[i].file.name, buffer};
                        })
                );
            }

            return Promise.all(fetchSequence)
                .then((rawdata) => {
                    return loader.parse(rawdata);
                })
                .then(function (series) {
                    seriesContainer.push(series);
                })
                .catch(function (error) {
                    window.console.log('oops... something went wrong...');
                    window.console.log(error);
                });
        }

        const loadSequenceContainer = [];

        const data = [];
        const dataGroups = [];
        // convert object into array
        for (let i = 0; i < evt.target.files.length; i++) {
            let dataUrl = CoreUtils.parseUrl(evt.target.files[i].name);
            if (dataUrl.extension.toUpperCase() === 'MHD' ||
                dataUrl.extension.toUpperCase() === 'RAW') {
                dataGroups.push(
                    {
                        file: evt.target.files[i],
                        extension: dataUrl.extension.toUpperCase(),
                    });
            } else {
                data.push(evt.target.files[i]);
            }
        }

        // check if some files must be loaded together
        if (dataGroups.length === 2) {
            // if raw/mhd pair
            const mhdFile = dataGroups.filter(_filterByExtension.bind(null, 'MHD'));
            const rawFile = dataGroups.filter(_filterByExtension.bind(null, 'RAW'));
            if (mhdFile.length === 1 &&
                rawFile.length === 1) {
                loadSequenceContainer.push(
                    loadSequenceGroup(dataGroups)
                );
            }
        }

        // load the rest of the files
        for (let i = 0; i < data.length; i++) {
            loadSequenceContainer.push(
                loadSequence(i, data)
            );
        }

        // run the load sequence
        // load sequence for all files
        Promise
            .all(loadSequenceContainer)
            .then(function () {
                handleSeries(seriesContainer);
            })
            .catch(function (error) {
                window.console.log('oops... something went wrong...');
                window.console.log(error);
            });
    }

    // hook up file input listener
    document.getElementById('filesinput')
        .addEventListener('change', readMultipleFiles, false);
};
