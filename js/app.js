var pads = {};
var loaded = false;
var padList;

window.onload = function () {
  padList = document.getElementById('pads');
}

function updateApp(data) {
  if (!data) {
    setupUser();
  } else {
    if (!loaded) {
      loaded = true;
      document.getElementById('username').innerHTML = data.name;
      document.documentElement.style.display = "block";
      selectPad(data.selected);
      window.setTimeout(function() {
        document.querySelector('.loadoverlay').style.opacity = 0;
        document.querySelector('.loadoverlay').style.pointerEvents = "none";
        console.log("ready!");
      }, 1000);
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
    selected: -1,
    pads: btoa(JSON.stringify({}))
  }, "");
}


var selectedPad = -1;

function updatePads() {
  padList.innerHTML = "";
  for (var i in pads) {
    ind = Object.keys(pads).indexOf(i);
    var padTemplate = `<div class="pad ${ind == selectedPad ? 'selected' : ''}" ${i != selectedPad ? 'onclick=\"selectPad('+ind+')\"' : null}><div class="pad-content"><b>${pads[i].name}</b><br>${pads[i].content}</div></div>`;
    padList.innerHTML += padTemplate;
  }
}

function createPad(name) {
  pads[name] = {
    name: name,
    content: ''
  };
  pushPads();
}

function pushPads() {
  writeData(btoa(JSON.stringify(pads)), "pads");
}

function selectPad(ind) {
  if (ind === undefined) {
    ind = -1
  };
  selectedPad = ind;
  updatePads();
  writeData(selectedPad, "selected");
}
