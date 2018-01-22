function setLoader() {
    var file = 'https://cdn.rawgit.com/FNNDSC/data/master/nifti/eun_brain/eun_uchar_8.nii.gz';

    var loader = new AMI.VolumeLoader(threeD);
    loader.load(file).then(function () {
        var series = loader.data[0].mergeSeries(loader.data)[0];
        loader.free();
        loader = null;
        var stack = series.stack[0];

        vrHelper = new AMI.VolumeRenderingHelper(stack);
        scene.add(vrHelper);

        setLUT();

        var centerLPS = updateCamera(stack);
        updateControls(centerLPS);

        buildGUI();

        fileLoadedAndGuiReady = true;
    });
}