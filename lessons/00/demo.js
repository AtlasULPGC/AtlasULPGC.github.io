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





function displaySeriesInfo(series) {
    var seriesIndex = 1;
    for (var mySeries of series) {
        var seriesDiv = document.createElement('div');
        seriesDiv.className += 'indent';
        seriesDiv.insertAdjacentHTML('beforeend', '<div> SERIES (' + seriesIndex + '/' + series.length + ')</div>');
        seriesDiv.insertAdjacentHTML(
            'beforeend',
            '<div class="series"> numberOfChannels: ' + mySeries.numberOfChannels + '</div>'
        );

        container.appendChild(seriesDiv);

        displayStackInfo(mySeries, seriesDiv);
        seriesIndex++;
    }
}