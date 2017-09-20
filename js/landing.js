var signupPane = document.getElementById("signup");
var signinPane = document.getElementById("signin");
var signupBtn = document.getElementById("signupBtn");
var signinBtn = document.getElementById("signinBtn");
var signupErr = document.getElementById("signup-error");
var signinErr = document.getElementById("signin-error");

var current = -1;

var url = new URL(window.location.href);
if (url.searchParams.get("error")){
  var error = url.searchParams.get("error");
  if(error.charAt(0) === '1'){
    signupErr.style.display = 'block';
    var errorText = "";
    if(error === "10"){
      errorText = "Passwords don't match.";
    } else if (error === "11") {
      errorText = "Password is too weak.";
    } else if (error === "12") {
      errorText = "Please enter a valid username.";
    } else if (error === "13") {
      errorText = "Username already in use.";
    } else {
      errorText = "Unknown error. (Code "+error+")";
    }
    signupErr.innerHTML = "<b>ERROR: </b>" + errorText;
    signupPn();
  } else if(error.charAt(0) === '2'){
    signinErr.style.display = 'block';
    var errorText = "";
    if(error === "20"){
      errorText = "Incorrect password.";
    } else if (error === "21") {
      errorText = "User doesn't exist!";
    } else if (error === "22") {
      errorText = "Please enter a valid username.";
    } else {
      errorText = "Unknown error. (Code "+error+")";
    }
    signinErr.innerHTML = "<b>ERROR: </b>" + errorText;
    signinPn();
  }


}


function signupPn() {
  signupBtn.disabled = true;
  signinBtn.disabled = false;
  if (current === -1) {
    current = 0;
    signupPane.style.maxHeight = signupPane.children[0].clientHeight + "px";
  } else if (current === 1) {
    current = 0;
    signinPane.style.maxHeight = 0;
    window.setTimeout(function() {
      signupPane.style.maxHeight = signupPane.children[0].clientHeight + "px";
    }, 250);
  }
}

function signinPn() {
  signupBtn.disabled = false;
  signinBtn.disabled = true;
  if (current === -1) {
    current = 1;
    signinPane.style.maxHeight = signupPane.children[0].clientHeight + "px";
  } else if (current === 0) {
    current = 1;
    signupPane.style.maxHeight = 0;
    window.setTimeout(function() {
      signinPane.style.maxHeight = signinPane.children[0].clientHeight + "px";
    }, 250);
  }
}

function submitSignin(frm) {
  if (frm.elements[0].value && frm.elements[1].value) {
    signIn(frm.elements[0].value, frm.elements[1].value);
  }
}

function submitSignup(frm) {
  if (frm.elements[0].value && frm.elements[1].value && frm.elements[2].value) {
    signUp(frm.elements[0].value, frm.elements[1].value, frm.elements[2].value);
  }
}
