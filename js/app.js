var pads = [];
var loaded = false;
var padList;
var welcome;

window.onload = function () {
  padList = document.getElementById('pads');
  welcome = document.getElementById('welcome');
}

function updateApp(data) {
  if (!data) {
    setupUser();
  } else {
    if (!loaded) {
      loaded = true;
      document.getElementById('username').innerHTML = data.name;
      document.documentElement.style.display = "block";
      console.log(data.selected);
      selectPad(data.selected);
      window.setTimeout(function() {
        document.querySelector('.loadoverlay').style.opacity = 0;
        document.querySelector('.loadoverlay').style.pointerEvents = "none";
        console.log("ready!");
      }, 10);
    }

    if (data.pads) {
      pads = JSON.parse(atob(data.pads));
    } else {
      pads = [];
    }
    updatePads();
  }
}

function setupUser() {
  console.log("Setting up user");
  writeData({
    name: username,
    uid: uid,
    pads: btoa(JSON.stringify([]))
  }, "");
  selectPad(-1);
}


var selectedPad = -1;

function updatePads() {
  padList.innerHTML = "";
  for (var i = 0; i < pads.length; i++) {
    var padTemplate = `<div class="pad ${i == selectedPad ? 'selected' : ''}" ${i != selectedPad ? 'onclick=\"selectPad('+i+')\"' : ''}><div class="pad-content"><b>${pads[i].name}</b><br>${pads[i].content}</div></div>`;
    padList.innerHTML += padTemplate;
  }
}

function createPad(name) {
  name = escapeHtml(name);
  pads.push({
    name: name,
    content: ''
  });
  pushPads();
}

function pushPads() {
  writeData(btoa(JSON.stringify(pads)), "pads");
}

function selectPad(ind) {
  console.log(ind);
  if (ind === undefined) {
    ind = -1
  };
  selectedPad = ind;
  updatePads();
  writeData(selectedPad, "selected");
  if(selectedPad === -1){
    welcome.style.display = 'flex';
  } else {
    welcome.style.display = 'none';
  }
}
