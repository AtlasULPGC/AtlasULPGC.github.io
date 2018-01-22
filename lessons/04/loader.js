function setLoader() {
// load sequence for each file
// instantiate the loader
// it loads and parses the dicom image
    var loader = new AMI.VolumeLoader(threeD);


    loader
        .load(files)
        .then(function () {
            handleSeries();
        })
        .catch(function (error) {
            window.console.log('oops... something went wrong...');
            window.console.log(error);
        });
}