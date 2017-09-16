// Initialize Firebase
var config = {
  apiKey: "AIzaSyCV9KlVxmRAPFxWcUlsYAlfd__GgNua7Dk",
  authDomain: "scratchpad-d2ebd.firebaseapp.com",
  databaseURL: "https://scratchpad-d2ebd.firebaseio.com",
  projectId: "scratchpad-d2ebd",
  storageBucket: "",
  messagingSenderId: "322610231154"
};
firebase.initializeApp(config);

console.log(" __                _       _                     _\n/ _\\ ___ _ __ __ _| |_ ___| |__  _ __   __ _  __| |\n\\ \\ / __| '__/ _` | __/ __| '_ \\| '_ \\ / _` |/ _` |\n_\\ \\ (__| | | (_| | || (__| | | | |_) | (_| | (_| |\n\\__/\\___|_|  \\__,_|\\__\\___|_| |_| .__/ \\__,_|\\__,_|\n                                |_|");

function writeData(d,p){
  if(uid){
    var uref = firebase.database().ref("/users/"+uid+"/"+p);
    uref.set(d).catch(function (error) {
      console.log(error.message);
    });
  } else {
    console.log("Not signed in");
  }
}

function readData(callback, p){
  if(uid){
    var s;
    var uref = firebase.database().ref("/users/"+uid+"/"+p);
    uref.once('value').then(function (s) {
      callback(s.val());
    });
  } else {
    console.log("Not signed in");
  }
}
