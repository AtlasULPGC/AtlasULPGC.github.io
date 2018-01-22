function setLoader() {

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