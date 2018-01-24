/**
 * Build GUI
 */
function buildGUI(stackHelper) {
    /**
     * Update Layer 1
     */
    function updateLayer1() {
        // update layer1 geometry...
        if (meshSegmentationLayer) {
            // dispose geometry first
            meshSegmentationLayer.geometry.dispose();
            meshSegmentationLayer.geometry = stackHelper.slice.geometry;
            meshSegmentationLayer.geometry.verticesNeedUpdate = true;
        }
    }

    /**
     * Update layer mix
     */
    function updateLayerMix() {
        // update layer1 geometry...
        if (meshLayerMix) {
            sceneLayerMix.remove(meshLayerMix);
            meshLayerMix.material.dispose();
            meshLayerMix.material = null;
            meshLayerMix.geometry.dispose();
            meshLayerMix.geometry = null;

            // add mesh in this scene with right shaders...
            meshLayerMix = new THREE.Mesh(stackHelper.slice.geometry, materialLayerMix);
            // go the LPS space
            meshLayerMix.applyMatrix(stackHelper.stack._ijk2LPS);

            sceneLayerMix.add(meshLayerMix);
        }
    }

    var stack = stackHelper.stack;

    var gui = new dat.GUI({
        autoPlace: false,
    });

    var customContainer = document.getElementById('my-gui-container');
    customContainer.appendChild(gui.domElement);

    var layer0Folder = gui.addFolder('CT');
    layer0Folder.add(stackHelper.slice, 'invert');

    var lutUpdate = layer0Folder.add(stackHelper.slice, 'lut', lutLayer0.lutsAvailable());
    lutUpdate.onChange(function (value) {
        lutLayer0.lut = value;
        stackHelper.slice.lutTexture = lutLayer0.texture;
    });

    var indexUpdate = layer0Folder
        .add(stackHelper, 'index', 0, stack.dimensionsIJK.z - 1)
        .step(1)
        .listen();
    indexUpdate.onChange(function () {
        updateLayer1();
        updateLayerMix();
    });

    layer0Folder
        .add(stackHelper.slice, 'interpolation', 0, 1)
        .step(1)
        .listen();

    layer0Folder.open();

    // layer mix folder
    var layerMixFolder = gui.addFolder('Segmentation');
    var opacityLayerMix1 = layerMixFolder.add(layerMix, 'opacity1', 0, 1).step(0.01);
    opacityLayerMix1.onChange(function (value) {
        uniformsLayerMix.uOpacity1.value = value;
    });

    layerMixFolder.open();

    // hook up callbacks
    controls.addEventListener('OnScroll', function (e) {
        if (e.delta > 0) {
            if (stackHelper.index >= stack.dimensionsIJK.z - 1) {
                return false;
            }
            stackHelper.index += 1;
        } else {
            if (stackHelper.index <= 0) {
                return false;
            }
            stackHelper.index -= 1;
        }

        updateLayer1();
        updateLayerMix();
    });

    updateLayer1();
    updateLayerMix();

    /**
     * Handle window resize
     */
    function onWindowResize() {
        var threeD = document.getElementById('container');
        camera.canvas = {
            width: threeD.clientWidth,
            height: threeD.clientHeight,
        };
        camera.fitBox(2);

        renderer.setSize(threeD.clientWidth, threeD.clientHeight);
    }

    window.addEventListener('resize', onWindowResize, false);
    onWindowResize();
}

var layerMix = {
    opacity1: 1.0,
};