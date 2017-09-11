<?php
session_start();
if(!isset($_SESSION["name"])){
  header("Location: ..");
}
?>
<html>
<head>
  <title>Scratchpad</title>
  <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
  <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"></link>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <script src="app.js"></script>
  <link href="css/application.css" rel="stylesheet" type="text/css"></link>
</head>
<body>
  <div class="left">
    <div class="userbar">
      <span class="username">
        <?php echo $_SESSION["name"] ?>
      </span>
      <button onclick="window.location = '/auth/logout'" class="logout-btn">
        Log Out
      </button>
    </div>
    <div class="pads" id="pads">
      <div class="pad">
        <div class="pad-content">
        <b>JEFF</b><br>
        My name is jeff. My name is jeff. My name is jeff. My name is jeff. My name is jeff. My name is jeff. My name is jeff. My name is jeff. My name is jeff. My name is jeff. My name is jeff.
      </div></div>
    </div>
  </div>
  <div class="right">

  </div>
</body>
</html>
