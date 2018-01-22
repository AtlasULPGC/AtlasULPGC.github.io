function setDicomDataUrl() {
    var data = [
        '000183.dcm',
        '000219.dcm',
        '000117.dcm',
        '000240.dcm',
        '000033.dcm',
        '000060.dcm',
        '000211.dcm',
        '000081.dcm',
        '000054.dcm',
        '000090.dcm',
        '000042.dcm',
        '000029.dcm',
        '000239.dcm',
        '000226.dcm',
        '000008.dcm',
        '000128.dcm',
        '000089.dcm',
        '000254.dcm',
        '000208.dcm',
        '000047.dcm',
        '000067.dcm'
    ];

    var rawgit = 'https://cdn.rawgit.com/FNNDSC/data/master/dicom/andrei_abdomen/';

    var dataFullPath = data.map(function (v) {
        return rawgit + 'data/' + v;
    });

    var labelmap = ['000000.dcm'];

    var labelmapFullPath = labelmap.map(function (v) {
        return rawgit + 'segmentation/' + v;
    });

    var files = dataFullPath.concat(labelmapFullPath);
    return files;
}