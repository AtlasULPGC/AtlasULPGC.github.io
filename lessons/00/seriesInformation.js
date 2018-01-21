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