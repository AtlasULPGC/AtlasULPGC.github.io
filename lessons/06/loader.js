

function setLoader() {
    var file = 'https://cdn.rawgit.com/FNNDSC/data/master/nifti/eun_brain/eun_uchar_8.nii.gz';

    var loader = new AMI.VolumeLoader(threeD);
    loader.load(file).then(function () {
        var series = loader.data[0].mergeSeries(loader.data)[0];
        loader.free();
        loader = null;
        // get first stack from series
        var stack = series.stack[0];

        vrHelper = new AMI.VolumeRenderingHelper(stack);
        // scene
        scene.add(vrHelper);

        // CREATE LUT
        setLUT();

        // update camrea's and interactor's target
        var centerLPS = stack.worldCenter();
        camera.lookAt(centerLPS.x, centerLPS.y, centerLPS.z);
        camera.updateProjectionMatrix();
        controls.target.set(centerLPS.x, centerLPS.y, centerLPS.z);

        // create GUI
        buildGUI();

        ready = true;
    });
}