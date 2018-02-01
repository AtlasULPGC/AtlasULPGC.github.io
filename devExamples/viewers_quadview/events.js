function checkOnWhatRendererHasBeenTriggeredTheEvent(event, renderer3d, axialRenderer, sagittalRenderer, coronalRenderer) {
    const canvas = event.target.parentElement;
    const id = event.target.id;
    const mouse = {
        x: ((event.clientX - canvas.offsetLeft) / canvas.clientWidth) * 2 - 1,
        y: -((event.clientY - canvas.offsetTop) / canvas.clientHeight) * 2 + 1,
    };
    //
    let camera = null;
    let stackHelper = null;
    let scene = null;
    switch (id) {
        case '0':
            camera = renderer3d.camera;
            stackHelper = axialRenderer.stackHelper;
            scene = renderer3d.scene;
            break;
        case '1':
            camera = axialRenderer.camera;
            stackHelper = axialRenderer.stackHelper;
            scene = axialRenderer.scene;
            break;
        case '2':
            camera = sagittalRenderer.camera;
            stackHelper = sagittalRenderer.stackHelper;
            scene = sagittalRenderer.scene;
            break;
        case '3':
            camera = coronalRenderer.camera;
            stackHelper = coronalRenderer.stackHelper;
            scene = coronalRenderer.scene;
            break;
    }
    return {mouse, camera, stackHelper, scene};
}

function updateSliceIndex(ijk, axialRenderer, sagittalRenderer, coronalRenderer) {
    axialRenderer.stackHelper.index =
        ijk.getComponent((axialRenderer.stackHelper.orientation + 2) % 3);
    sagittalRenderer.stackHelper.index =
        ijk.getComponent((sagittalRenderer.stackHelper.orientation + 2) % 3);
    coronalRenderer.stackHelper.index =
        ijk.getComponent((coronalRenderer.stackHelper.orientation + 2) % 3);
}

function doubleClickIsOnSlice(intersects) {
    return intersects.length > 0;
}

function onWindowResize(renderer3d, axialRenderer, sagittalRenderer, coronalRenderer) {
    // update 3D
    renderer3d.camera.aspect = renderer3d.domElement.clientWidth / renderer3d.domElement.clientHeight;
    renderer3d.camera.updateProjectionMatrix();
    renderer3d.renderer.setSize(
        renderer3d.domElement.clientWidth, renderer3d.domElement.clientHeight);

    // update 2d
    windowResize2D(axialRenderer);
    windowResize2D(sagittalRenderer);
    windowResize2D(coronalRenderer);
}
function windowResize2D(rendererObj) {
    rendererObj.camera.canvas = {
        width: rendererObj.domElement.clientWidth,
        height: rendererObj.domElement.clientHeight,
    };
    rendererObj.camera.fitBox(2, 1);
    rendererObj.renderer.setSize(
        rendererObj.domElement.clientWidth,
        rendererObj.domElement.clientHeight);

    // update info to draw borders properly
    rendererObj.stackHelper.slice.canvasWidth =
        rendererObj.domElement.clientWidth;
    rendererObj.stackHelper.slice.canvasHeight =
        rendererObj.domElement.clientHeight;
    rendererObj.localizerHelper.canvasWidth =
        rendererObj.domElement.clientWidth;
    rendererObj.localizerHelper.canvasHeight =
        rendererObj.domElement.clientHeight;
}
export {checkOnWhatRendererHasBeenTriggeredTheEvent, updateSliceIndex, doubleClickIsOnSlice, onWindowResize};