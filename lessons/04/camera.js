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

function setCameraAxisDimensions(ctGrayImagesStack) {
    var worldbb = ctGrayImagesStack.worldBoundingBox();
    const xAxisRange = worldbb[1] - worldbb[0];
    const yAxisRange = worldbb[3] - worldbb[2];
    const zAxisRange = worldbb[5] - worldbb[4];
    var lpsDims = new THREE.Vector3(xAxisRange, yAxisRange, zAxisRange);
    return lpsDims;
}

function setCameraAxisCenter(lpsDims, ctGrayImagesStack) {
    const xAxisCenter = lpsDims.x + 10;
    const yAxisCenter = lpsDims.y + 10;
    const zAxisCenter = lpsDims.z + 10;
    var box = {
        center: ctGrayImagesStack.worldCenter().clone(),
        halfDimensions: new THREE.Vector3(xAxisCenter, yAxisCenter, zAxisCenter)
    };
    return box;
}

function setCanvasInitAndZoom() {
    var canvas = {
        width: threeD.clientWidth,
        height: threeD.clientHeight,
    };
    return canvas;
}

function setCameraOnTarget(ctGrayImagesStack) {
    var lpsDims = setCameraAxisDimensions(ctGrayImagesStack);

    var box = setCameraAxisCenter(lpsDims, ctGrayImagesStack);

    var canvas = setCanvasInitAndZoom();
    camera.directions = [ctGrayImagesStack.xCosine, ctGrayImagesStack.yCosine, ctGrayImagesStack.zCosine];
    camera.box = box;
    camera.canvas = canvas;
    camera.update();
    camera.fitBox(2);
}