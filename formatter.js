var editor;
window.onload = function () {
  editor = document.getElementById('editor');
  document.addEventListener('keyup',function (e) {
    if(e.keyCode === 9){

      document.execCommand('insertHTML', false, '&#009');
      e.preventDefault();

    }
  });
}

function runCmd(cmd, arg){
  document.execCommand(cmd, false, arg);
}
