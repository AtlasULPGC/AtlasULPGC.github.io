import HelpersBoundingBox from 'base/helpers/helpers.boundingbox';

function setBoundingBoxHelper(stack, r0) {
    let boxHelper = new HelpersBoundingBox(stack);
    r0.scene.add(boxHelper);
}

export {setBoundingBoxHelper};