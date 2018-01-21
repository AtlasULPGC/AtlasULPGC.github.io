/* globals dat, AMI*/

var {container, renderer} = setRenderer();

function setRenderer() {
    var container = document.getElementById('container');
    let smoothBorders = true;
    var renderer = new THREE.WebGLRenderer({
        antialias: smoothBorders
    });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    let grayColor = 0x353535;
    let alpha = 1;
    renderer.setClearColor(grayColor, alpha);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    return {container, renderer};
}


// Setup scene
var scene = new THREE.Scene();

var camera = setCamera();

function setCamera() {
    let fieldOfView = 45;
    let aspectRatio = container.offsetWidth / container.offsetHeight;
    let near = 0.01;
    let far = 10000000;
    var camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
    camera.position.x = 150;
    camera.position.y = 150;
    camera.position.z = 100;
    return camera;
}

// Setup controls
var controls = new AMI.TrackballControl(camera, container);


/**
 * Handle window resize
 */
function onWindowResize() {
    updateCamera();
    updateRenderer();

    function updateCamera() {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
    }

    function updateRenderer() {
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    }
}

window.addEventListener('resize', onWindowResize, false);

/**
 * Build GUI
 */
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
    }


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

/**
 * Start animation loop
 */
function animate() {
    controls.update();
    renderer.render(scene, camera);

    // request new frame
    requestAnimationFrame(function () {
        animate();
    });
}

animate();

var loader = new AMI.VolumeLoader(container);

var files = setUrls();

function setUrls() {
    var urlEnding = [
        '36444280',
        '36444294',
        '36444308',
        '36444322',
        '36444336',
        '36444350',
        '36444364',
        '36444378',
        '36444392',
        '36444406',
        '36444434',
        '36444448',
        '36444462',
        '36444476',
        '36444490',
        '36444504',
        '36444518',
        '36444532',
        '36746856'
    ];
    var files = urlEnding.map(function (currentUrlEnding) {
        return 'https://cdn.rawgit.com/FNNDSC/data/master/dicom/adi_brain/' + currentUrlEnding;
    });
    return files;
}


loader
    .load(files)
    .then(function () {
        // merge files into clean series/stack/frame structure
        var series = loader.data[0].mergeSeries(loader.data);
        var stack = series[0].stack[0];
        loader.free();
        loader = null;
        // be carefull that series and target stack exist!
        var stackHelper = new AMI.StackHelper(stack);
        stackHelper.bbox.color = 0x8bc34a;
        stackHelper.border.color = 0xf44336;

        scene.add(stackHelper);

        // build the gui
        gui(stackHelper);

        // center camera and interactor to center of bouding box
        var centerLPS = stackHelper.stack.worldCenter();
        camera.lookAt(centerLPS.x, centerLPS.y, centerLPS.z);
        camera.updateProjectionMatrix();
        controls.target.set(centerLPS.x, centerLPS.y, centerLPS.z);
    })
    .catch(function (error) {
        window.console.log('oops... something went wrong...');
        window.console.log(error);
    });
