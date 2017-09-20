var username;
var uid;

function signIn(name, pass) {
  if(!uid){
    firebase.auth().signInWithEmailAndPassword(name+'@scratchpad.d2ebd', pass).catch(function (e) {
      var url = new URL(window.location.href);
      console.log(e.code);
      switch(e.code){
        case "auth/wrong-password":
          url.searchParams.set("error", "20");
          break;
        case "auth/user-not-found":
          url.searchParams.set("error", "21");
          break;
        case "auth/invalid-email":
          url.searchParams.set("error", "22");
          break;
      }
      window.location.href = url.href;
    });
  } else {
    console.log("User already signed in!");
  }
}

function signUp(name, pass, pass2) {
  if(!uid){
    var url = new URL(window.location.href);
    if(pass === pass2){
      firebase.auth().createUserWithEmailAndPassword(name+'@scratchpad.d2ebd', pass).catch(function (e) {
        switch(e.code){
          case "auth/weak-password":
            url.searchParams.set("error", "11");
            break;
          case "auth/invalid-email":
            url.searchParams.set("error", "12");
            break;
          case "auth/email-already-in-use":
            url.searchParams.set("error", "13");
            break;
        }
        console.log(e.code);
        console.log(url.href);
        window.location.href = url.href;
      });
    } else {
        url.searchParams.set("error", "10");
        window.location.href = url.href;
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
      firebase.database().ref("/users/"+uid).on('value', function(snapshot){
        updateApp(snapshot.val());
      });
    }

  } else {
    username = undefined;
    uid = undefined;
    console.log("Not signed in");
    if(window.location.pathname !== "/")
      window.location.replace("/");
  }
});
