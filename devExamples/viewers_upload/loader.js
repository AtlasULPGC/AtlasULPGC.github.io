import CoreUtils from 'base/core/core.utils';
import LoadersVolume from 'base/loaders/loaders.volume';
import handleSeries from './handleSeries';


/**
 * Parse incoming files
 */
export default function readMultipleFiles(evt, scene, camera, lut, camUtils, controls) {

    let loader = new LoadersVolume(threeD);
    let seriesContainer = [];

    if (areFilesBeingUploaded(evt)) {
        hideUploadButtonAndFileInputExplorer();
    }
    const {loadSequenceContainer, data, dataGroups} = convertObjectIntoArray(evt);

    readGroupOfFiles(dataGroups, loadSequenceContainer, loader, seriesContainer);

    readFiles(data, loadSequenceContainer, loader, seriesContainer);

    handleFilesLoadedAsSeries(loadSequenceContainer, seriesContainer, loader, scene, camera, lut, camUtils, controls);
}

function _filterByExtension(extension, item) {
    if (item.extension.toUpperCase() === extension.toUpperCase()) {
        return true;
    }
    return false;
}

function areFilesBeingUploaded(evt) {
    return evt.target.files.length;
}

function hideUploadButtonAndFileInputExplorer() {
    document.getElementById('home-container').style.display = 'none';
}

function loadSequence(index, files, loader, seriesContainer) {
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

function loadSequenceGroup(files, loader, seriesContainer) {
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

function convertObjectIntoArray(evt) {
    const loadSequenceContainer = [];
    const data = [];
    const dataGroups = [];
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
    return {loadSequenceContainer, data, dataGroups};
}

function ifRawMhdPair(dataGroups, loadSequenceContainer, loader, seriesContainer) {
    const mhdFile = dataGroups.filter(_filterByExtension.bind(null, 'MHD'));
    const rawFile = dataGroups.filter(_filterByExtension.bind(null, 'RAW'));
    if (mhdFile.length === 1 &&
        rawFile.length === 1) {
        loadSequenceContainer.push(
            loadSequenceGroup(dataGroups, loader, seriesContainer)
        );
    }
}

function readFiles(data, loadSequenceContainer, loader, seriesContainer) {
    for (let i = 0; i < data.length; i++) {
        loadSequenceContainer.push(
            loadSequence(i, data, loader, seriesContainer)
        );
    }
}

function readGroupOfFiles(dataGroups, loadSequenceContainer, loader, seriesContainer) {
    if (dataGroups.length === 2) {
        ifRawMhdPair(dataGroups, loadSequenceContainer, loader, seriesContainer);
    }
}

function handleFilesLoadedAsSeries(loadSequenceContainer, seriesContainer, loader, scene, camera, lut, camUtils, controls) {
    Promise
        .all(loadSequenceContainer)
        .then(function () {
            handleSeries(seriesContainer, loader, scene, camera, lut, camUtils, controls);
        })
        .catch(function (error) {
            window.console.log('oops... something went wrong...');
            window.console.log(error);
        });
}