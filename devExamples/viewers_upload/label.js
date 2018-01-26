function updateLabels(labels, modality) {
    if (isImageFormatWithoutCoordinateInfo(modality)) return;
    updateTopLabel(labels);
    updateBottomLabel(labels);
    updateRightLabel(labels);
    updateLeftLabel(labels);
}

function isImageFormatWithoutCoordinateInfo(modality) {
    return modality === 'CR' || modality === 'DX';
}

function updateTopLabel(labels) {
    let top = document.getElementById('top');
    top.innerHTML = labels[0];
}

function updateBottomLabel(labels) {
    let bottom = document.getElementById('bottom');
    bottom.innerHTML = labels[1];
}

function updateRightLabel(labels) {
    let right = document.getElementById('right');
    right.innerHTML = labels[2];
}

function updateLeftLabel(labels) {
    let left = document.getElementById('left');
    left.innerHTML = labels[3];
}
