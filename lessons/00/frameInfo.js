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