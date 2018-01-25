import {initHelpersStack} from "./viewers_quadview";

function setAxialSlice(axialRenderer, stack, renderer3d) {
    initHelpersStack(axialRenderer, stack);
    renderer3d.scene.add(axialRenderer.scene);
}

export {setAxialSlice};