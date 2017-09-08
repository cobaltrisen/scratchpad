<?php
  if(!isset($_POST["name"]) || !isset($_POST["pass"]) || !isset($_POST["passc"])){
    header("Location: .");
    exit();
  }
  if ($_POST["pass"] !== $_POST["passc"]) {
    header("Location: .?s_error=mismatch");
  } else {
    require_once "./sqlconn.php";
    $sql = "SELECT * FROM `users` WHERE USER_NAME='".mysqli_real_escape_string($conn, htmlentities($_POST["name"]))."'";
    if($result = mysqli_query($conn, $sql)){
      if(mysqli_num_rows($result) === 0){
        $sql = "INSERT INTO `users` (`USER_ID`, `USER_NAME`, `USER_PASSWORD`, `USER_DATA`) VALUES (NULL, '" . mysqli_real_escape_string($conn, htmlentities($_POST["name"])) . "', '" . password_hash(htmlentities($_POST["pass"]), PASSWORD_DEFAULT) . "', '{}')";
        if(mysqli_query($conn, $sql)){
          session_start();
          $_SESSION["name"] = htmlentities($_POST["name"]);
          header("Location: ./application.php");
        } else {
          echo mysqli_error($conn);
          mysqli_close($conn);
          header("Location: .?s_error=database");
        }
      } else {
        header("Location: .?s_error=taken");
      }
    } else {
      header("Location: .?s_error=database");
    }
  }
?>
