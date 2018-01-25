import {initHelpersStack} from "./viewers_quadview";

function setAxialSlice(axialRenderer, stack, renderer3d) {
    initHelpersStack(axialRenderer, stack);
    renderer3d.scene.add(axialRenderer.scene);
}

function setSagittalSlice(sagittalRenderer, stack, renderer3d) {
    initHelpersStack(sagittalRenderer, stack);
    renderer3d.scene.add(sagittalRenderer.scene);
}

export {setAxialSlice, setSagittalSlice};