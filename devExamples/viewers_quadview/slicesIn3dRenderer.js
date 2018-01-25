import {initHelpersStack} from "./viewers_quadview";
import {initHelpersLocalizer} from "./localizerHelper";

function setAxialSlice(axialRenderer, stack, renderer3d) {
    initHelpersStack(axialRenderer, stack);
    renderer3d.scene.add(axialRenderer.scene);
}

function setSagittalSlice(sagittalRenderer, stack, renderer3d) {
    initHelpersStack(sagittalRenderer, stack);
    renderer3d.scene.add(sagittalRenderer.scene);
}

function setCoronalSlice(coronalRenderer, stack, renderer3d) {
    initHelpersStack(coronalRenderer, stack);
    renderer3d.scene.add(coronalRenderer.scene);
}

function setAxialSliceBetweenSagittalAndCoronal(axialRenderer, stack, axialPlane, sagittalPlane, sagittalRenderer, coronalPlane, coronalRenderer) {
    initHelpersLocalizer(axialRenderer, stack, axialPlane, [
        {
            plane: sagittalPlane,
            color: new THREE.Color(sagittalRenderer.stackHelper.borderColor),
        },
        {
            plane: coronalPlane,
            color: new THREE.Color(coronalRenderer.stackHelper.borderColor),
        },
    ]);
}

function setSagittalSliceBetweenAxialAndCoronal(sagittalRenderer, stack, sagittalPlane, axialPlane, axialRenderer, coronalPlane, coronalRenderer) {
    initHelpersLocalizer(sagittalRenderer, stack, sagittalPlane, [
        {
            plane: axialPlane,
            color: new THREE.Color(axialRenderer.stackHelper.borderColor),
        },
        {
            plane: coronalPlane,
            color: new THREE.Color(coronalRenderer.stackHelper.borderColor),
        },
    ]);
}

function setPlanes(axialRenderer, sagittalRenderer, coronalRenderer) {
    let axialPlane = axialRenderer.stackHelper.slice.cartesianEquation();
    let sagittalPlane = sagittalRenderer.stackHelper.slice.cartesianEquation();
    let coronalPlane = coronalRenderer.stackHelper.slice.cartesianEquation();
    return {axialPlane, sagittalPlane, coronalPlane};
}

export {
    setAxialSlice, setSagittalSlice, setCoronalSlice, setPlanes,
    setAxialSliceBetweenSagittalAndCoronal, setSagittalSliceBetweenAxialAndCoronal
}



