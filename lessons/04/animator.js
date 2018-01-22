/**
 * Animation loop
 */
function animate() {

    controls.update();

    renderer.render(sceneLayer0, camera, sceneLayer0TextureTarget, true);

    renderer.render(sceneLayer1, camera, sceneLayer1TextureTarget, true);

    renderer.render(sceneLayerMix, camera);
    statsyay.update();


    requestAnimationFrame(function () {
        animate();
    });
}