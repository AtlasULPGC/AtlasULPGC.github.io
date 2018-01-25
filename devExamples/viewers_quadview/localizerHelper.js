import HelpersLocalizer from 'base/helpers/helpers.localizer';

function initHelpersLocalizer(rendererObj, stack, referencePlane, localizers) {
    rendererObj.localizerHelper = new HelpersLocalizer(
        stack, rendererObj.stackHelper.slice.geometry, referencePlane);

    for (let i = 0; i < localizers.length; i++) {
        rendererObj.localizerHelper['plane' + (i + 1)] = localizers[i].plane;
        rendererObj.localizerHelper['color' + (i + 1)] = localizers[i].color;
    }

    rendererObj.localizerHelper.canvasWidth =
        rendererObj.domElement.clientWidth;
    rendererObj.localizerHelper.canvasHeight =
        rendererObj.domElement.clientHeight;

    rendererObj.localizerScene = new THREE.Scene();
    rendererObj.localizerScene.add(rendererObj.localizerHelper);
}

export {initHelpersLocalizer};