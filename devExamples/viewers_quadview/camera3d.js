function setCamera3d(renderObj) {
    const fieldOfView = 45;
    const aspectRatio = renderObj.domElement.clientWidth / renderObj.domElement.clientHeight;
    const near = 0.1;
    const far = 100000;
    renderObj.camera = new THREE.PerspectiveCamera(
        fieldOfView, aspectRatio,
        near, far);
    renderObj.camera.position.x = 250;
    renderObj.camera.position.y = 250;
    renderObj.camera.position.z = 250;
}

function calculateWorldCenter(stack) {
    let worldbb = stack.worldBoundingBox();
    const xAxisCenter = (worldbb[1] - worldbb[0]) / 2;
    const yAxisCenter = (worldbb[3] - worldbb[2]) / 2;
    const zAxisCenter = (worldbb[5] - worldbb[4]) / 2;
    let lpsDims = new THREE.Vector3(
        xAxisCenter,
        yAxisCenter,
        zAxisCenter
    );
    return lpsDims;
}

function calculateCameraBox(stack, lpsDims) {
    let box = {
        center: stack.worldCenter().clone(),
        halfDimensions:
            new THREE.Vector3(lpsDims.x + 10, lpsDims.y + 10, lpsDims.z + 10),
    };
    return box;
}

function calculateCameraCanvas(rendererObj) {
    let canvas = {
        width: rendererObj.domElement.clientWidth,
        height: rendererObj.domElement.clientHeight,
    };
    return canvas;
}


function setUpCameraWhenInitializingStackHelper(rendererObj, stack, box, canvas) {
    rendererObj.camera.directions =
        [stack.xCosine, stack.yCosine, stack.zCosine];
    rendererObj.camera.box = box;
    rendererObj.camera.canvas = canvas;
    rendererObj.camera.orientation = rendererObj.sliceOrientation;
    rendererObj.camera.update();
    const useBestWidthOrHeightToRecalculateSize = 2;
    const initialZoomFactor = 1;
    rendererObj.camera.fitBox(useBestWidthOrHeightToRecalculateSize, initialZoomFactor);
}

export {setCamera3d};
export {calculateWorldCenter};
export {calculateCameraBox};
export {calculateCameraCanvas};
export {setUpCameraWhenInitializingStackHelper};