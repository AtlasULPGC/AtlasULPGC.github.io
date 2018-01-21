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