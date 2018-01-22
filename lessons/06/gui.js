/**
 * Build GUI
 */
function buildGUI() {
    var gui = new dat.GUI({
        autoPlace: false
    });

    var customContainer = document.getElementById('my-gui-container');
    customContainer.appendChild(gui.domElement);

    var stackFolder = gui.addFolder('Settings');
    var lutUpdate = stackFolder.add(myStack, 'lut', lut.lutsAvailable());
    lutUpdate.onChange(function (value) {
        lut.lut = value;
        vrHelper.uniforms.uTextureLUT.value.dispose();
        vrHelper.uniforms.uTextureLUT.value = lut.texture;
    });
    // init LUT
    lut.lut = myStack.lut;
    vrHelper.uniforms.uTextureLUT.value.dispose();
    vrHelper.uniforms.uTextureLUT.value = lut.texture;

    var opacityUpdate = stackFolder.add(myStack, 'opacity', lut.lutsAvailable('opacity'));
    opacityUpdate.onChange(function (value) {
        lut.lutO = value;
        vrHelper.uniforms.uTextureLUT.value.dispose();
        vrHelper.uniforms.uTextureLUT.value = lut.texture;
    });

    var stepsUpdate = stackFolder.add(myStack, 'steps', 0, 512).step(1);
    stepsUpdate.onChange(function (value) {
        if (vrHelper.uniforms) {
            vrHelper.uniforms.uSteps.value = value;
        }
    });

    var alphaCorrrectionUpdate = stackFolder.add(myStack, 'alphaCorrection', 0, 1).step(0.01);
    alphaCorrrectionUpdate.onChange(function (value) {
        if (vrHelper.uniforms) {
            vrHelper.uniforms.uAlphaCorrection.value = value;
        }
    });

    stackFolder.add(vrHelper, 'interpolation', 0, 1).step(1);

    stackFolder.open();
}
