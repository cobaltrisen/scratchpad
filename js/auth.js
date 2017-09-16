var username;
var uid;

function signIn(name, pass) {
  if(!uid){
    firebase.auth().signInWithEmailAndPassword(name+'@scratchpad.d2ebd', pass);
  } else {
    console.log("User already signed in!");
  }
}

function signUp(name, pass, pass2) {
  if(!uid){
    if(pass === pass2 && pass.trim() !== ""){
      firebase.auth().createUserWithEmailAndPassword(name+'@scratchpad.d2ebd', pass);
    } else {
      console.log("Invalid password");
    }
  } else {
    console.log("User already signed in!");
  }
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    username = user.email.split("@")[0];
    uid = user.uid;
    console.log("Signed in as",username);
    if(window.location.pathname !== "/app"){
      window.location.replace("/app");
    } else {
      loadApp();
      firebase.database().ref("/users/"+uid).on('value', function(snapshot){
        updateApp(snapshot.val());
      });
    }

  } else {
    username = undefined;
    uid = undefined;
    console.log("Signed out");
    if(window.location.pathname !== "/")
      window.location.replace("/");
  }
});
