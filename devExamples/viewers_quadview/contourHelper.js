import HelpersContour from '../../src/helpers/helpers.contour';


function setContourHelper(redContourHelper, stack, r1, redTextureTarget) {
    redContourHelper = new HelpersContour(stack, r1.stackHelper.slice.geometry);
    redContourHelper.canvasWidth = redTextureTarget.width;
    redContourHelper.canvasHeight = redTextureTarget.height;
    redContourHelper.textureToFilter = redTextureTarget.texture;
    return redContourHelper;
}

export {setContourHelper};