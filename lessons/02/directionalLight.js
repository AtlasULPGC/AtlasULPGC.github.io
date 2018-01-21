function setDirectionalLight() {
    let whiteColor = 0xffffff;
    let data = 1;
    var directionalLight = new THREE.DirectionalLight(whiteColor, data);
    let xPos = 1;
    let yPos = 1;
    let zPos = 1;
    directionalLight.position.set(xPos, yPos, zPos).normalize();
    return directionalLight;
}