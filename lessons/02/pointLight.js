function setPointLight() {
    let whiteColor = 0xffffff;
    let intensity = 2;
    let distance = 800;
    var pointLight = new THREE.PointLight(whiteColor, intensity, distance);
    return pointLight;
}