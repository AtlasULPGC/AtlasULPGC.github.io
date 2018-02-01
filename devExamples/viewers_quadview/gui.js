function setGui(axialRenderer, sagittalRenderer, coronalRenderer) {
    let gui = new dat.GUI({
        autoPlace: false,
    });

    let customContainer = document.getElementById('my-gui-container');
    customContainer.appendChild(gui.domElement);

    // Red
    let axialFolder = gui.addFolder('Axial (Red)');
    let axialChanged = axialFolder.add(
        axialRenderer.stackHelper,
        'index', 0, axialRenderer.stackHelper.orientationMaxIndex).step(1).listen();
    axialFolder.add(
        axialRenderer.stackHelper.slice, 'interpolation', 0, 1).step(1).listen();

    // Yellow
    let sagittalFolder = gui.addFolder('Sagittal (yellow)');
    let sagittalChanged = sagittalFolder.add(
        sagittalRenderer.stackHelper,
        'index', 0, sagittalRenderer.stackHelper.orientationMaxIndex).step(1).listen();
    sagittalFolder.add(
        sagittalRenderer.stackHelper.slice, 'interpolation', 0, 1).step(1).listen();

    // Green
    let coronalFolder = gui.addFolder('Coronal (green)');
    let coronalChanged = coronalFolder.add(
        coronalRenderer.stackHelper,
        'index', 0, coronalRenderer.stackHelper.orientationMaxIndex).step(1).listen();
    coronalFolder.add(
        coronalRenderer.stackHelper.slice, 'interpolation', 0, 1).step(1).listen();
    return {redChanged: axialChanged, yellowChanged: sagittalChanged, greenChanged: coronalChanged};
}

export {setGui};