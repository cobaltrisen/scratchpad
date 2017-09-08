<?php
  session_start();
  if(!isset($_SESSION["name"])){
    header("Location: .");
    exit();
  }
  require_once "./sqlconn.php";
  $sql = "UPDATE `users` SET USER_DATA = '" . $_POST["data"] . "' WHERE USER_NAME = '" . mysqli_real_escape_string($conn, $_SESSION["name"]) . "'";
  echo $sql;
  mysqli_query($conn, $sql);

?>
