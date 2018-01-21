function gui(stackHelper) {
    var gui = new dat.GUI({
        autoPlace: false
    });

    var customContainer = document.getElementById('my-gui-container');
    customContainer.appendChild(gui.domElement);
    // only reason to use this object is to satusfy data.GUI
    var camUtils = {
        invertRows: false,
        invertColumns: false,
        rotate45: false,
        rotate: 0,
        orientation: 'default',
        convention: 'radio',
    };

    // camera
    var cameraFolder = gui.addFolder('Camera');
    var invertRows = cameraFolder.add(camUtils, 'invertRows');
    invertRows.onChange(function () {
        camera.invertRows();
    });

    var invertColumns = cameraFolder.add(camUtils, 'invertColumns');
    invertColumns.onChange(function () {
        camera.invertColumns();
    });

    var rotate45 = cameraFolder.add(camUtils, 'rotate45');
    rotate45.onChange(function () {
        camera.rotate();
    });

    cameraFolder
        .add(camera, 'angle', 0, 360)
        .step(1)
        .listen();

    let orientationUpdate = cameraFolder.add(camUtils, 'orientation', ['default', 'axial', 'coronal', 'sagittal']);
    orientationUpdate.onChange(function (value) {
        camera.orientation = value;
        camera.update();
        camera.fitBox(2);
        stackHelper.orientation = camera.stackOrientation;
    });

    let conventionUpdate = cameraFolder.add(camUtils, 'convention', ['radio', 'neuro']);
    conventionUpdate.onChange(function (value) {
        camera.convention = value;
        camera.update();
        camera.fitBox(2);
    });

    cameraFolder.open();

    // of course we can do everything from lesson 01!
    var stackFolder = gui.addFolder('Stack');
    stackFolder
        .add(stackHelper, 'index', 0, Math.max(stackHelper.stack.dimensionsIJK.x - 1, stackHelper.stack.dimensionsIJK.y - 1, stackHelper.stack.dimensionsIJK.z - 1))
        .step(1)
        .listen();
    stackFolder
        .add(stackHelper.slice, 'interpolation', 0, 1)
        .step(1)
        .listen();
    stackFolder.open();
}