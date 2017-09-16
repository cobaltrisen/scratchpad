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


function writeData(d){
  if(uid){
    var uref = firebase.database().ref("/users/"+uid);
    uref.set(d).catch(function (error) {
      console.log(error.message);
    });
  } else {
    console.log("Not signed in");
  }
}

function readData(callback){
  if(uid){
    var s;
    var uref = firebase.database().ref("/users/"+uid);
    uref.once('value').then(function (s) {
      callback(s.val());
    });
  } else {
    console.log("Not signed in");
  }
}
