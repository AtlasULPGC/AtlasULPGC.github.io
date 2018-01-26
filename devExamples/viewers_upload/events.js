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
        let threeD = document.getElementById('r3d');
        camera.canvas = {
            width: threeD.clientWidth,
            height: threeD.clientHeight,
        };
        camera.fitBox(2);

        renderer.setSize(threeD.clientWidth, threeD.clientHeight);

        // update info to draw borders properly
        stackHelper.slice.canvasWidth = threeD.clientWidth;
        stackHelper.slice.canvasHeight = threeD.clientHeight;
    }

    window.addEventListener('resize', onWindowResize, false);
    onWindowResize();

    /**
     * On key pressed callback
     */
    function onWindowKeyPressed(event) {
        ctrlDown = event.ctrlKey;
        if (!ctrlDown) {
            drag.start.x = null;
            drag.start.y = null;
        }
    }

    document.addEventListener('keydown', onWindowKeyPressed, false);
    document.addEventListener('keyup', onWindowKeyPressed, false);

    /**
     * On mouse move callback
     */
    function onMouseMove(event) {
        if (ctrlDown) {
            if (drag.start.x === null) {
                drag.start.x = event.clientX;
                drag.start.y = event.clientY;
            }
            let threshold = 15;

            stackHelper.slice.intensityAuto = false;

            let dynamicRange = stack.minMax[1] - stack.minMax[0];
            dynamicRange /= threeD.clientWidth;

            if (Math.abs(event.clientX - drag.start.x) > threshold) {
                // window width
                stackHelper.slice.windowWidth +=
                    dynamicRange * (event.clientX - drag.start.x);
                drag.start.x = event.clientX;
            }

            if (Math.abs(event.clientY - drag.start.y) > threshold) {
                // window center
                stackHelper.slice.windowCenter -=
                    dynamicRange * (event.clientY - drag.start.y);
                drag.start.y = event.clientY;
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