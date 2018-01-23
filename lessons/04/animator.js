
function animate() {

    controls.update();


    renderer.render(sceneLayerCT, camera, sceneLayerCTTextureTarget, true);

    renderer.render(sceneLayerSegmentation, camera, sceneLayerSegmentationTextureTarget, true);

    renderer.render(sceneLayerMix, camera);
    statsyay.update();


    requestAnimationFrame(function () {
        animate();
    });
}