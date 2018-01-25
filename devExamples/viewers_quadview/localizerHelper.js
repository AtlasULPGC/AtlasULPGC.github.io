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
function updateLocalizer(referenceRenderer, localizerHelpersToDetermineAxisMovement) {
    let refHelper = referenceRenderer.stackHelper;
    let localizerHelper = referenceRenderer.localizerHelper;
    let plane = refHelper.slice.cartesianEquation();
    localizerHelper.referencePlane = plane;


    readAndAssignPlanesToDetermineAxisMovement(localizerHelpersToDetermineAxisMovement, plane);

    localizerHelper.geometry = refHelper.slice.geometry;
}

function readAndAssignPlanesToDetermineAxisMovement(localizerHelpersToDetermineAxisMovement, plane) {
    for (let i = 0; i < localizerHelpersToDetermineAxisMovement.length; i++) {
        const currentPlanesSize = 2;
        for (let j = 0; j < currentPlanesSize; j++) {
            let currentPlaneToDetermineAxisMovement = localizerHelpersToDetermineAxisMovement[i]['plane' + (j + 1)];

            if (currentPlaneToDetermineAxisMovement &&
                plane.x.toFixed(6) === currentPlaneToDetermineAxisMovement.x.toFixed(6) &&
                plane.y.toFixed(6) === currentPlaneToDetermineAxisMovement.y.toFixed(6) &&
                plane.z.toFixed(6) === currentPlaneToDetermineAxisMovement.z.toFixed(6)) {
                localizerHelpersToDetermineAxisMovement[i]['plane' + (j + 1)] = plane;
            }
        }
    }
}
export {initHelpersLocalizer, updateLocalizer};