import readMultipleFiles from './loader';

export default function startReadingFromFilesInputOnChangeEvent(scene, camera, lut, camUtils, controls) {
    document.getElementById('filesinput')
        .addEventListener('change', function (event) {
            readMultipleFiles(event, scene, camera, lut, camUtils, controls)
        }, false);
}