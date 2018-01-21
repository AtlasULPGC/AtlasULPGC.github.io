/* globals dat, AMI*/


var {container, renderer} = setRenderer();

var scene = new THREE.Scene();

var camera = setCamera();

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
        var series = mergeFilesIntoSeriesStacksFramesStructure();

        function mergeFilesIntoSeriesStacksFramesStructure() {
            var series = loader.data[0].mergeSeries(loader.data);
            return series;
        }

        var stack = series[0].stack[0];

        unsetLoader();

        function unsetLoader() {
            loader.free();
            loader = null;
        }

        var stackHelper = setStackHelper();

        function setStackHelper() {
            var stackHelper = new AMI.StackHelper(stack);
            let greenColor = 0x8bc34a;
            stackHelper.bbox.color = greenColor;
            let redColor = 0xf44336;
            stackHelper.border.color = redColor;

            scene.add(stackHelper);
            return stackHelper;
        }

        gui(stackHelper);

        centerCamera();

        function centerCamera() {
            var centerLPS = stackHelper.stack.worldCenter();
            camera.lookAt(centerLPS.x, centerLPS.y, centerLPS.z);
            camera.updateProjectionMatrix();
            controls.target.set(centerLPS.x, centerLPS.y, centerLPS.z);
        }
    })
    .catch(function (error) {
        window.console.log('oops... something went wrong...');
        window.console.log(error);
    });
