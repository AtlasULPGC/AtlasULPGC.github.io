function setGui(axialRenderer, sagittalRenderer, coronalRenderer) {
    let gui = new dat.GUI({
        autoPlace: false,
    });

    let customContainer = document.getElementById('my-gui-container');
    customContainer.appendChild(gui.domElement);

    // Red
    let stackFolder1 = gui.addFolder('Axial (Red)');
    let axialChanged = stackFolder1.add(
        axialRenderer.stackHelper,
        'index', 0, axialRenderer.stackHelper.orientationMaxIndex).step(1).listen();
    stackFolder1.add(
        axialRenderer.stackHelper.slice, 'interpolation', 0, 1).step(1).listen();

    // Yellow
    let stackFolder2 = gui.addFolder('Sagittal (yellow)');
    let sagittalChanged = stackFolder2.add(
        sagittalRenderer.stackHelper,
        'index', 0, sagittalRenderer.stackHelper.orientationMaxIndex).step(1).listen();
    stackFolder2.add(
        sagittalRenderer.stackHelper.slice, 'interpolation', 0, 1).step(1).listen();

    // Green
    let stackFolder3 = gui.addFolder('Coronal (green)');
    let coronalChanged = stackFolder3.add(
        coronalRenderer.stackHelper,
        'index', 0, coronalRenderer.stackHelper.orientationMaxIndex).step(1).listen();
    stackFolder3.add(
        coronalRenderer.stackHelper.slice, 'interpolation', 0, 1).step(1).listen();
    return {redChanged: axialChanged, yellowChanged: sagittalChanged, greenChanged: coronalChanged};
}

export {setGui};