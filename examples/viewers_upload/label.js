'use strict';

function updateLabels(labels, modality) {
    if (modality === 'CR' || modality === 'DX') return;

    var top = document.getElementById('top');
    top.innerHTML = labels[0];

    var bottom = document.getElementById('bottom');
    bottom.innerHTML = labels[1];

    var right = document.getElementById('right');
    right.innerHTML = labels[2];

    var left = document.getElementById('left');
    left.innerHTML = labels[3];
}
//# sourceMappingURL=label.js.map