var data = {
  pads: [
    {
      name: "pad 1",
      content: "aaaaa"
    },{
      name: "pad 2",
      content: "bbbbb"
    },{
      name: "pad 3",
      content: "ccccc"
    }
  ]
}
var selectedPad = 1;
var padList;
window.onload = function () {
  padList = document.getElementById('pads');
  updateList();
}

function updateList() {
  var pads = data.pads;
  padList.innerHTML = "";
  for (var i = 0; i < pads.length; i++) {
      var padTemplate = `<div class="pad ${i == selectedPad ? 'selected' : null}" ${i != selectedPad ? 'onclick=\"selectedPad='+i+'; updateList();\"' : null}><div class="pad-content"><b>${pads[i].name}</b><br>${pads[i].content}</div></div>`;
      padList.innerHTML += padTemplate;
  }
}

function loadData(){

}
