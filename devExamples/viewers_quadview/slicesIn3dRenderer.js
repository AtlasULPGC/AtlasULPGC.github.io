import {initHelpersStack} from "./viewers_quadview";

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

function setPlanes(axialRenderer, sagittalRenderer, coronalRenderer) {
    let axialPlane = axialRenderer.stackHelper.slice.cartesianEquation();
    let sagittalPlane = sagittalRenderer.stackHelper.slice.cartesianEquation();
    let coronalPlane = coronalRenderer.stackHelper.slice.cartesianEquation();
    return {axialPlane, sagittalPlane, coronalPlane};
}

export {setAxialSlice, setSagittalSlice, setCoronalSlice, setPlanes};