/* globals AMI*/

var container = setProgressBar();


var loader = setLoader();

var files = setUrl();



loader
    .load(files)
    .then(function () {
        var series = mergeFileIntoSeriesStackFramesStructure();

        function mergeFileIntoSeriesStackFramesStructure() {
            var series = loader.data[0].mergeSeries(loader.data);
            return series;
        }

        unsetLoader();

        function unsetLoader() {
            loader.free();
            loader = null;
        }

        displaySeriesInfo(series);
    })
    .catch(function (error) {
        window.console.log('oops... something went wrong...');
        window.console.log(error);
    });





