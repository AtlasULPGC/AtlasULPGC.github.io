function setParticleLight() {
    let radius = 4;
    let widthSegments = 8;
    let heightSegments = 8;
    let whiteColor = 0xffffff;
    var particleLight = new THREE.Mesh(
        new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments),
        new THREE.MeshBasicMaterial({color: whiteColor})
    );
    scene.add(particleLight);
    return particleLight;
}