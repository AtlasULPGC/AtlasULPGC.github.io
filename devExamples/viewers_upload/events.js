/**
 * Connect all callbevent observesrs
 */
function hookCallbacks(stackHelper, controls, camera) {

    let ctrlDown = false;
    let drag = {
        start: {
            x: null,
            y: null,
        },
    };

    let stack = stackHelper._stack;

    controls.addEventListener('OnScroll', function (e) {
        if (scrollMovementIsPositive(e)) {
            if (isScrollMovementOnPositiveLimit(stackHelper)) {
                return false;
            }
            moveOnPositiveDirection(stackHelper);
        } else {
            if (isScrollMovementOnNegativeLimit(stackHelper)) {
                return false;
            }
            moveOnNegativeDirection(stackHelper);
        }
    });

    /**
     * On window resize callback
     */
    function onWindowResize() {
        let threeD = updateCamera(camera);

        updateRenderer(threeD);

        updateInfoToDrawBorders(stackHelper, threeD);
    }

    window.addEventListener('resize', onWindowResize, false);
    onWindowResize();

    /**
     * On key pressed callback
     */
    function onWindowKeyPressed(event) {
        ctrlDown = initDrag(ctrlDown, event);
        if (isDragStopped(ctrlDown)) {
            resetDrag(drag);
        }
    }

    document.addEventListener('keydown', onWindowKeyPressed, false);
    document.addEventListener('keyup', onWindowKeyPressed, false);

    /**
     * On mouse move callback
     */
    function onMouseMove(event) {
        if (ctrlDown) {
            if (isDragNotStarted(drag)) {
                setDrag(drag, event);
            }
            let threshold = 15;

            stackHelper.slice.intensityAuto = false;

            let dynamicRange = setDynamicRanhetoControlWindowWidthAndHeight(stack);
            dynamicRange = setDynamicRangeRelatedToCurrentWidnowSize(dynamicRange);

            if (isCtrlMovementAboveTheThresholdInTheXAxis(event, drag, threshold)) {
                updateWindowWidth(stackHelper, dynamicRange, event, drag);
                updateDragStart(drag, event);
            }

            if (isCtrlMovementGreaterThanThresholdInTheYAxis(event, drag, threshold)) {
                updateWindowCenter(stackHelper, dynamicRange, event, drag);
                updateYAxisDragStart(drag, event);
            }
        }
    }

    document.addEventListener('mousemove', onMouseMove);
}

function scrollMovementIsPositive(e) {
    return e.delta > 0;
}

function isScrollMovementOnPositiveLimit(stackHelper) {
    return stackHelper.index >= stackHelper.orientationMaxIndex - 1;
}

function moveOnPositiveDirection(stackHelper) {
    stackHelper.index += 1;
}

function isScrollMovementOnNegativeLimit(stackHelper) {
    return stackHelper.index <= 0;
}

function moveOnNegativeDirection(stackHelper) {
    stackHelper.index -= 1;
}

function updateCamera(camera) {
    let threeD = document.getElementById('r3d');
    camera.canvas = {
        width: threeD.clientWidth,
        height: threeD.clientHeight,
    };
    camera.fitBox(2);
    return threeD;
}

function updateRenderer(threeD) {
    renderer.setSize(threeD.clientWidth, threeD.clientHeight);
}

function updateInfoToDrawBorders(stackHelper, threeD) {
    stackHelper.slice.canvasWidth = threeD.clientWidth;
    stackHelper.slice.canvasHeight = threeD.clientHeight;
}

function isDragStopped(ctrlDown) {
    return !ctrlDown;
}

function initDrag(ctrlDown, event) {
    ctrlDown = event.ctrlKey;
    return ctrlDown;
}

function resetDrag(drag) {
    drag.start.x = null;
    drag.start.y = null;
}

function isDragNotStarted(drag) {
    return drag.start.x === null;
}

function setDrag(drag, event) {
    drag.start.x = event.clientX;
    drag.start.y = event.clientY;
}

function setDynamicRanhetoControlWindowWidthAndHeight(stack) {
    let dynamicRange = stack.minMax[1] - stack.minMax[0];
    return dynamicRange;
}

function setDynamicRangeRelatedToCurrentWidnowSize(dynamicRange) {
    dynamicRange /= threeD.clientWidth;
    return dynamicRange;
}

function isCtrlMovementAboveTheThresholdInTheXAxis(event, drag, threshold) {
    return Math.abs(event.clientX - drag.start.x) > threshold;
}

function updateWindowWidth(stackHelper, dynamicRange, event, drag) {
    stackHelper.slice.windowWidth +=
        dynamicRange * (event.clientX - drag.start.x);
}

function updateDragStart(drag, event) {
    drag.start.x = event.clientX;
}

function isCtrlMovementGreaterThanThresholdInTheYAxis(event, drag, threshold) {
    return Math.abs(event.clientY - drag.start.y) > threshold;
}

function updateWindowCenter(stackHelper, dynamicRange, event, drag) {
    stackHelper.slice.windowCenter -=
        dynamicRange * (event.clientY - drag.start.y);
}

function updateYAxisDragStart(drag, event) {
    drag.start.y = event.clientY;
}
