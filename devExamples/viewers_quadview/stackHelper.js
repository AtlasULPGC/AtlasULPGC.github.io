import HelpersStack from 'base/helpers/helpers.stack';

export default function setStackHelper(rendererObj, stack) {
    rendererObj.stackHelper = new HelpersStack(stack);
    rendererObj.stackHelper.bbox.visible = false;
    rendererObj.stackHelper.borderColor = rendererObj.sliceColor;
    rendererObj.stackHelper.slice.canvasWidth =
        rendererObj.domElement.clientWidth;
    rendererObj.stackHelper.slice.canvasHeight =
        rendererObj.domElement.clientHeight;
}