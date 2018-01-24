'use strict';

/**
 * Connect all callbevent observesrs
 */
function hookCallbacks(stackHelper, controls, camera) {

    var ctrlDown = false;
    var drag = {
        start: {
            x: null,
            y: null
        }
    };

    var stack = stackHelper._stack;
    // hook up callbacks
    controls.addEventListener('OnScroll', function (e) {
        if (e.delta > 0) {
            if (stackHelper.index >= stackHelper.orientationMaxIndex - 1) {
                return false;
            }
            stackHelper.index += 1;
        } else {
            if (stackHelper.index <= 0) {
                return false;
            }
            stackHelper.index -= 1;
        }
    });

    /**
     * On window resize callback
     */
    function onWindowResize() {
        var threeD = document.getElementById('r3d');
        camera.canvas = {
            width: threeD.clientWidth,
            height: threeD.clientHeight
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
            var threshold = 15;

            stackHelper.slice.intensityAuto = false;

            var dynamicRange = stack.minMax[1] - stack.minMax[0];
            dynamicRange /= threeD.clientWidth;

            if (Math.abs(event.clientX - drag.start.x) > threshold) {
                // window width
                stackHelper.slice.windowWidth += dynamicRange * (event.clientX - drag.start.x);
                drag.start.x = event.clientX;
            }

            if (Math.abs(event.clientY - drag.start.y) > threshold) {
                // window center
                stackHelper.slice.windowCenter -= dynamicRange * (event.clientY - drag.start.y);
                drag.start.y = event.clientY;
            }
        }
    }

    document.addEventListener('mousemove', onMouseMove);
}
//# sourceMappingURL=events.js.map