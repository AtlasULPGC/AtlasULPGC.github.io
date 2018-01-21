function gui(stackHelper) {
    var {stack, gui} = setGui();

    function setGui() {
        var stack = stackHelper.stack;
        var gui = new dat.GUI({
            autoPlace: false,
        });
        var customContainer = document.getElementById('my-gui-container');
        customContainer.appendChild(gui.domElement);
        return {stack, gui};
    }


    var stackFolder = setStackFolder();

    function setStackFolder() {
        var stackFolder = gui.addFolder('Stack');
        return stackFolder;
    }

    var index = setIndexSlider();

    function setIndexSlider() {
        let minIndex = 0;
        let maxIndex = stack.dimensionsIJK.z - 1;
        var index = stackFolder
            .add(stackHelper, 'index', minIndex, maxIndex)
            .step(1)
            .listen();
        return index;
    }

    var orientation = setOrientation();

    function setOrientation() {
        let minOrientation = 0;
        let maxOrientation = 2;
        var orientation = stackFolder
            .add(stackHelper, 'orientation', minOrientation, maxOrientation)
            .step(1)
            .listen();
        return orientation;
    }

    updateOrientation();

    function updateOrientation() {
        orientation.onChange(function (value) {
            index.__max = stackHelper.orientationMaxIndex;
            let setInitialSliderAtHalf = Math.floor(index.__max / 2);
            stackHelper.index = setInitialSliderAtHalf;
        });
    }

    stackFolder.open();

    var sliceFolder = setSliceFolder();

    function setSliceFolder() {
        var sliceFolder = gui.addFolder('Slice');
        return sliceFolder;
    }

    let minWidth = 1;
    let maxWidth = stack.minMax[1] - stack.minMax[0];

    setWindowWidthSlider();

    function setWindowWidthSlider() {
        sliceFolder
            .add(stackHelper.slice, 'windowWidth', minWidth, maxWidth)
            .step(1)
            .listen();
    }

    setWindowCenterSlider();


    function setWindowCenterSlider() {
        let centerMin = stack.minMax[0];
        let centerMax = stack.minMax[1];
        sliceFolder
            .add(stackHelper.slice, 'windowCenter', centerMin, centerMax)
            .step(1)
            .listen();
        setIntensityCheckBox();

        function setIntensityCheckBox() {
            sliceFolder.add(stackHelper.slice, 'intensityAuto').listen();
        }

        setInvertCheckBox();

        function setInvertCheckBox() {
            sliceFolder.add(stackHelper.slice, 'invert');
        }


        sliceFolder.open();

        setBorderBoxFolder();

        function setBorderBoxFolder() {
            var bboxFolder = gui.addFolder('Bounding Box');
            bboxFolder.add(stackHelper.bbox, 'visible');
            bboxFolder.addColor(stackHelper.bbox, 'color');
            bboxFolder.open();
        }

        setBorderFolder();

        function setBorderFolder() {
            var borderFolder = gui.addFolder('Border');
            borderFolder.add(stackHelper.border, 'visible');
            borderFolder.addColor(stackHelper.border, 'color');
            borderFolder.open();
        }
    }
}