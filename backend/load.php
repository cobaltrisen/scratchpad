<?php
  session_start();
  if(!isset($_SESSION["name"])){
    header("Location: ..");
    exit();
  }
  require_once "sqlconn.php";
  $sql = "SELECT * FROM `users` WHERE USER_NAME = '" . mysqli_real_escape_string($conn, $_SESSION["name"]) . "'";
  if($result = mysqli_query($conn, $sql)){
    if(mysqli_num_rows($result) === 1){
      $row = mysqli_fetch_assoc($result);
      echo $row["USER_DATA"];
    }
  }
?>
