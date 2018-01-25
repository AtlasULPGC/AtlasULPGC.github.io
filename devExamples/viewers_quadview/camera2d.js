import CamerasOrthographic from 'base/cameras/cameras.orthographic';

function setCamera2d(rendererObj) {
    const left = rendererObj.domElement.clientWidth / -2;
    const top = rendererObj.domElement.clientWidth / 2;
    const right = rendererObj.domElement.clientHeight / 2;
    const bottom = rendererObj.domElement.clientHeight / -2;
    const near = 1;
    const far = 1000;
    rendererObj.camera = new CamerasOrthographic(
        left,
        top,
        right,
        bottom,
        near, far);
}

function update2dViewersWithNewIntersectionPlanes(refObj, currentPlaneWhereIntersectionUpdateIsProduced) {
    const stackHelper = refObj.stackHelper;
    const camera = refObj.camera;
    let vertices = stackHelper.slice.geometry.vertices;
    let p1 = new THREE.Vector3(vertices[0].x, vertices[0].y, vertices[0].z)
        .applyMatrix4(stackHelper._stack.ijk2LPS);
    let p2 = new THREE.Vector3(vertices[1].x, vertices[1].y, vertices[1].z)
        .applyMatrix4(stackHelper._stack.ijk2LPS);
    let p3 = new THREE.Vector3(vertices[2].x, vertices[2].y, vertices[2].z)
        .applyMatrix4(stackHelper._stack.ijk2LPS);


    calculateAPlaneFromThreePointsTakenInTheStackToUpdateCurrentSliceWhereIntersectionsAreDrawn(currentPlaneWhereIntersectionUpdateIsProduced, p1, p2, p3);

    let cameraDirection = new THREE.Vector3(1, 1, 1);
    cameraDirection.applyQuaternion(camera.quaternion);

    if (cameraDirection.dot(currentPlaneWhereIntersectionUpdateIsProduced.normal) > 0) {
        currentPlaneWhereIntersectionUpdateIsProduced.negate();
    }
}

function calculateAPlaneFromThreePointsTakenInTheStackToUpdateCurrentSliceWhereIntersectionsAreDrawn(currentPlaneWhereIntersectionUpdateIsProduced, p1, p2, p3) {
    currentPlaneWhereIntersectionUpdateIsProduced.setFromCoplanarPoints(p1, p2, p3);
}

export {setCamera2d, update2dViewersWithNewIntersectionPlanes};