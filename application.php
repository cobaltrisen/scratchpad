<?php
session_start();
if(!isset($_SESSION["name"])){
  header("Location: .");
}
echo "Hello, " . $_SESSION["name"];
?>
<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
<br><a href="./logout.php">Logout</a><br>
<textarea onchange="save(this)" style="width: 500px; height: 400px">
</textarea><br>
<span id="savetext">Not saved</span>

<script>
var val = "";
var st = document.getElementById('savetext');
var saving = false;
var data = {};
function save(ta) {
  if(!saving){
    saving = true;
    st.innerHTML = "Saving...";
    if(ta.value.trim() != val){
      val = ta.value.trim();
      var d = new Date();
      var savetext = "Last saved at "+d.getHours()%12 + ":" + ((toString(d.getMinutes()).length > 1) ? d.getMinutes() : "0" + d.getMinutes());
      data.modified = savetext;
      data.text = btoa(ta.value);
      $.post("save.php", {data:btoa(JSON.stringify(data))}, function (ret) {
          st.innerHTML = "Saved.";
          saving = false;
      });

    }
  }
}
function load(ta){
  $.ajax({
    type: 'get',
    url: './load.php',
    success: function(ret){
      console.log(ret);
      data = JSON.parse(atob(ret));
      ta.value = atob(data.text);
    }
  });
}
load(document.querySelector('textarea'));
</script>
