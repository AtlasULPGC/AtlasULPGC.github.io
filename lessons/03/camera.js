function setCamera() {
    let left = container.clientWidth / -2;
    let right = container.clientWidth / 2;
    let top = container.clientHeight / 2;
    let bottom = container.clientHeight / -2;
    let near = 0.1;
    let far = 10000;
    var camera = new AMI.OrthographicCamera(
        left,
        right,
        top,
        bottom,
        near,
        far
    );
    return camera;
}