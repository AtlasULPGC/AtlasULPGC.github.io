function setLoadButtonWithFileInput() {
    document.getElementById('buttoninput').onclick = function () {
        document.getElementById('filesinput').click();
    };
}