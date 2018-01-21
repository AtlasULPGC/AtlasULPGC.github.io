function setUrl() {
    var urlEndingToEachFile = ['36444280', '36444294', '36444308', '36444322', '36444336'];
    var files = urlEndingToEachFile.map(function (currentUrlEnding) {
        return 'https://cdn.rawgit.com/FNNDSC/data/master/dicom/adi_brain/' + currentUrlEnding;
    });
    return files;
}