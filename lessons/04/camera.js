function setCamera() {
    let left = threeD.clientWidth / -2;
    let right = threeD.clientWidth / 2;
    let top = threeD.clientHeight / 2;
    let bottom = threeD.clientHeight / -2;
    let near = 0.1;
    let far = 10000;
    camera = new AMI.OrthographicCamera(
        left,
        right,
        top,
        bottom,
        near,
        far
    );
}

function setCameraOnTarget(ctGrayImagesStack) {
//
    // set camera
    var worldbb = ctGrayImagesStack.worldBoundingBox();
    var lpsDims = new THREE.Vector3(worldbb[1] - worldbb[0], worldbb[3] - worldbb[2], worldbb[5] - worldbb[4]);

    // box: {halfDimensions, center}
    var box = {
        center: ctGrayImagesStack.worldCenter().clone(),
        halfDimensions: new THREE.Vector3(lpsDims.x + 10, lpsDims.y + 10, lpsDims.z + 10)
    };

    // init and zoom
    var canvas = {
        width: threeD.clientWidth,
        height: threeD.clientHeight,
    };
    camera.directions = [ctGrayImagesStack.xCosine, ctGrayImagesStack.yCosine, ctGrayImagesStack.zCosine];
    camera.box = box;
    camera.canvas = canvas;
    camera.update();
    camera.fitBox(2);
}