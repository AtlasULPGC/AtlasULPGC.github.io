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

function displayFrameInfo(myStack, stackDiv) {
    var frameIndex = 1;
    for (var myFrame of myStack.frame) {
        var frameDiv = document.createElement('div');
        frameDiv.className += 'indent';
        frameDiv.insertAdjacentHTML(
            'beforeend',
            '<div> FRAME (' + frameIndex + '/' + myStack.frame.length + ')</div>'
        );
        frameDiv.insertAdjacentHTML(
            'beforeend',
            '<div class="frame"> instanceNumber: ' + myFrame.instanceNumber + '</div>'
        );

        stackDiv.appendChild(frameDiv);
        frameIndex++;
    }
    return {frameIndex, frameDiv};
}

function displayStackInfo(mySeries, seriesDiv) {
    var stackIndex = 1;
    for (var myStack of mySeries.stack) {
        var stackDiv = document.createElement('div');
        stackDiv.className += 'indent';
        stackDiv.insertAdjacentHTML(
            'beforeend',
            '<div> STACK (' + stackIndex + '/' + mySeries.stack.length + ')</div>'
        );
        stackDiv.insertAdjacentHTML(
            'beforeend',
            '<div class="stack"> bitsAllocated: ' + myStack.bitsAllocated + '</div>'
        );

        seriesDiv.appendChild(stackDiv);

        displayFrameInfo(myStack, stackDiv);

        stackIndex++;
    }
    return {stackIndex, stackDiv};
}

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