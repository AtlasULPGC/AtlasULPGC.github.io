function loadSTLModel(scene) {
    var loaderSTL = new THREE.STLLoader();
    loaderSTL.load('https://cdn.rawgit.com/FNNDSC/data/master/stl/adi_brain/WM.stl', function (geometry) {
        let redColor = 0xf44336;
        let blackColor = 0x111111;
        var material = new THREE.MeshPhongMaterial({color: redColor, specular: blackColor, shininess: 200});
        var mesh = new THREE.Mesh(geometry, material);
        // to LPS space
        var RASToLPS = new THREE.Matrix4();
        RASToLPS.set(-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        mesh.applyMatrix(RASToLPS);
        scene.add(mesh);
    });
}