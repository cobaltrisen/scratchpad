function loadApp(){
  readData(function (s) {
    document.getElementById('username').innerHTML = s.name;
    document.documentElement.style.display = "block";
  });

  console.log("init!");
}

function updateApp(data){
  console.log(data);
  if(!data){
    setupUser();
  }
}

function setupUser(){
  console.log("Setting up user");
  writeData({name: username, uid: uid});
}
