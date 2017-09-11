<?php
  session_start();
  if(isset($_SESSION["name"])){
    header("Location: ./app.php");
  } else {
    session_abort();
  }
?>
<!DOCTYPE html>
<html>
<head>
  <link href="css/landing.css" rel="stylesheet" type="text/css"></link>
  <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"></link>
  <title>Scratchpad</title>
</head>
<body>
  <div class="content">
    <div class="box">
      <h1>Scratchpad</h1>
      <h2>The simple and secure cloud-based note and document manager</h2><br>
      <button onclick="signup()" id="sbut">Sign Up</button><button onclick="login()" id="lbut">Log in</button>
      <div id="signup" class="pane">
      <form action="auth/signup" method="post">
        <?php
          if(isset($_GET['s_error'])){
            echo "<div class=\"error\"><b>ERROR</b>: ";
            if($_GET['s_error'] === "mismatch"){
              echo "Passwords don't match!";
            } else if($_GET['s_error'] === "database"){
              echo "Database Error!";
            } else if($_GET['s_error'] === "taken"){
              echo "Username taken!";
            } else {
              echo "Unknown Error";
            }
            echo "</div>";
          }
        ?>

        <input type="text" name="name" placeholder="Username" maxlength="32"></input><br>
        <input type="password" name="pass" placeholder="Password"></input><br>
        <input type="password" name="passc" placeholder="Confirm Password"></input><br>
        <input type="submit" name="submitBtn" value="Create Account"></input>
      </form>
    </div>
    <div id="login" class="pane">
    <form action="auth/login" method="post">
      <?php
        if(isset($_GET['l_error'])){
          echo "<div class=\"error\"><b>ERROR</b>: ";
          if($_GET['l_error'] === "password"){
            echo "Password is incorrect!";
          } else if($_GET['l_error'] === "username"){
            echo "Username is invalid!";
          } else if($_GET['l_error'] === "database"){
            echo "Database Error!";
          } else {
            echo "Unknown Error";
          }
          echo "</div>";
        }
      ?>

      <input type="text" name="name" placeholder="Username" maxlength="32"></input><br>
      <input type="password" name="pass" placeholder="Password"></input><br>
      <input type="submit" name="submitBtn" value="Log In"></input>
    </form>
  </div>
    </div>
  </div>
  <script>
    var sup = document.getElementById("signup");
    var log = document.getElementById("login");
    var sub = document.getElementById("sbut");
    var lb = document.getElementById("lbut");
    var current = -1;
    var url = new URL(window.location.href);
    if(url.searchParams.get("l_error"))
      login();
    if(url.searchParams.get("s_error"))
      signup();
    function signup() {
      sub.disabled = true;
      lb.disabled = false;
      if(current === -1){
        current = 0;
        sup.style.maxHeight = sup.children[0].clientHeight + "px";
      } else if (current === 1){
        current = 0;
        log.style.maxHeight = 0;
        window.setTimeout(function () {
          sup.style.maxHeight = sup.children[0].clientHeight + "px";
        }, 250);
      }
    }
    function login() {
      sub.disabled = false;
      lb.disabled = true;
      if(current === -1){
        current = 1;
        log.style.maxHeight = sup.children[0].clientHeight + "px";
      } else if (current === 0){
        current = 1;
        sup.style.maxHeight = 0;
        window.setTimeout(function () {
          log.style.maxHeight = log.children[0].clientHeight + "px";
        }, 250);
      }
    }
  </script>
</body>
</html>
