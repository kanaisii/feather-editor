var editor = null;

window.addEventListener('DOMContentLoaded', onLoad);

function onLoad() {
    editor = ace.edit('editor_area');
    editor.setFontSize(24);
    editor.setTheme('ace/theme/tomorrow_night');
    editor.setMode('ace/mode/text');
    editor.focus();
}

function setTheme(tname) {
    editor.setTheme('ace/theme/' + tname)
}

function setMode(mname) {
    editor.session.setMode('ace/mode/' + mname);
}

function setFontSize(fsize) {
    editor.setFontSize(fsize);
}