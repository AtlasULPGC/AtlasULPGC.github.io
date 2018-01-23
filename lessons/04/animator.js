/**
 * Animation loop
 */
function animate() {

    controls.update();

    renderer.render(sceneLayer0, camera, sceneLayerCTTextureTarget, true);

    renderer.render(sceneLayer1, camera, sceneLayerSegmentationTextureTarget, true);

    renderer.render(sceneLayerMix, camera);
    statsyay.update();


    requestAnimationFrame(function () {
        animate();
    });
}