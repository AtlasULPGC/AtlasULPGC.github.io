function buildGUI(stackHelper) {

    function updateSegmentationLayer() {

        if (meshSegmentationLayer) {

            meshSegmentationLayer.geometry.dispose();
            meshSegmentationLayer.geometry = stackHelper.slice.geometry;
            meshSegmentationLayer.geometry.verticesNeedUpdate = true;
        }
    }

    function updateLayerMix() {
        if (meshLayerMix) {
            sceneLayerMix.remove(meshLayerMix);
            meshLayerMix.material.dispose();
            meshLayerMix.material = null;
            meshLayerMix.geometry.dispose();
            meshLayerMix.geometry = null;

            meshLayerMix = new THREE.Mesh(stackHelper.slice.geometry, materialLayerMix);

            meshLayerMix.applyMatrix(stackHelper.stack._ijk2LPS);

            sceneLayerMix.add(meshLayerMix);
        }
    }

    function setDataObjectToInteractBetweenBrowserAndGui() {
        var stack = stackHelper.stack;

        var gui = new dat.GUI({
            autoPlace: false,
        });

        var customContainer = document.getElementById('my-gui-container');
        customContainer.appendChild(gui.domElement);
        return {stack, gui};
    }

    var {stack, gui} = setDataObjectToInteractBetweenBrowserAndGui();

    var layer0Folder = gui.addFolder('CT');
    layer0Folder.add(stackHelper.slice, 'invert');

    var lutUpdate = layer0Folder.add(stackHelper.slice, 'lut', lutCTGrayImagesLayer.lutsAvailable());
    lutUpdate.onChange(function (value) {
        lutCTGrayImagesLayer.lut = value;
        stackHelper.slice.lutTexture = lutCTGrayImagesLayer.texture;
    });

    const minIndex = 0;
    const maxIndex = stack.dimensionsIJK.z - 1;
    var indexUpdate = layer0Folder
        .add(stackHelper, 'index', minIndex, maxIndex)
        .step(1)
        .listen();
    indexUpdate.onChange(function () {
        updateSegmentationLayer();
        updateLayerMix();
    });

    layer0Folder
        .add(stackHelper.slice, 'interpolation', 0, 1)
        .step(1)
        .listen();

    layer0Folder.open();

    var layerMixFolder = gui.addFolder('Segmentation');
    var opacitySegmentationLayer = layerMixFolder.add(layerMix, 'opacity1', 0, 1).step(0.01);
    opacitySegmentationLayer.onChange(function (value) {
        uniformsLayerMix.uOpacity1.value = value;
    });

    layerMixFolder.open();

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

        updateSegmentationLayer();
        updateLayerMix();
    });

    updateSegmentationLayer();
    updateLayerMix();

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

    window.addEventListener('click', onWindowClick, false);

    function onWindowClick(event) {
        alert('You have clicked: ' + event.clientX + " " + event.clientY);
    }

}

var layerMix = {
    opacity1: 1.0,
};