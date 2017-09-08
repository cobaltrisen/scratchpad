<?php
    if(!isset($_POST["name"]) || !isset($_POST["pass"])){
      header("Location: .");
      exit();
    }
    require_once "./sqlconn.php";
    $sql = "SELECT * FROM `users` WHERE USER_NAME='".mysqli_real_escape_string($conn, htmlentities($_POST["name"]))."'";
    if($result = mysqli_query($conn, $sql)){
      if(mysqli_num_rows($result) === 1){
        // login
        $row = mysqli_fetch_assoc($result);
        if(password_verify($_POST["pass"], $row["USER_PASSWORD"])){
          session_start();
          $_SESSION["name"] = htmlentities($_POST["name"]);
          header("Location: ./application.php");
        } else {
          header("Location: .?l_error=password");
        }

      } else {
        header("Location: .?l_error=username");
      }

    } else {
      header("Location: .?l_error=database");
    }
?>
