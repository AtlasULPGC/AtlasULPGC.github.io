function setCamera() {
    let left = threeD.clientWidth / -2;
    let right = threeD.clientWidth / 2;
    let top = threeD.clientHeight / 2;
    let bottom = threeD.clientHeight / -2;
    let near = 0.1;
    let far = 10000;
    camera = new AMI.OrthographicCamera(
        left,
        right,
        top,
        bottom,
        near,
        far
    );
}

