function setLoader() {
    var loader = new AMI.VolumeLoader(container);
    var file = 'https://cdn.rawgit.com/FNNDSC/data/master/nifti/adi_brain/adi_brain.nii.gz';

    loader
        .load(file)
        .then(function () {
            // merge files into clean series/stack/frame structure
            var series = loader.data[0].mergeSeries(loader.data);
            var stack = series[0].stack[0];
            loader.free();
            loader = null;
            // be carefull that series and target stack exist!
            var stackHelper = new AMI.StackHelper(stack);
            // stackHelper.orientation = 2;
            // stackHelper.index = 56;

            // tune bounding box
            stackHelper.bbox.visible = false;

            // tune slice border
            stackHelper.border.color = 0xff9800;
            // stackHelper.border.visible = false;

            scene.add(stackHelper);

            // build the gui
            gui(stackHelper);

            // center camera and interactor to center of bouding box
            // for nicer experience
            // set camera
            var worldbb = stack.worldBoundingBox();
            var lpsDims = new THREE.Vector3(worldbb[1] - worldbb[0], worldbb[3] - worldbb[2], worldbb[5] - worldbb[4]);

            // box: {halfDimensions, center}
            var box = {
                center: stack.worldCenter().clone(),
                halfDimensions: new THREE.Vector3(lpsDims.x + 10, lpsDims.y + 10, lpsDims.z + 10)
            };

            // init and zoom
            var canvas = {
                width: container.clientWidth,
                height: container.clientHeight,
            };

            camera.directions = [stack.xCosine, stack.yCosine, stack.zCosine];
            camera.box = box;
            camera.canvas = canvas;
            camera.update();
            camera.fitBox(2);
        })
        .catch(function (error) {
            window.console.log('oops... something went wrong...');
            window.console.log(error);
        });
}