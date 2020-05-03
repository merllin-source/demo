<?php
$test=array("test",12345678);
//echo "欢迎！";
//echo $_GET["id"];
//echo "访问者输入域名：";
//echo $_SERVER['REQUEST_URI'];
//echo "<br>";
echo "<div id='id' style='display:none;'>".$_GET["id"]."</div>";
if ($_GET["id"]==$test[0] && $_GET["password"]==$test[1] )
{	
    $file=fopen("join.html","r");
	$content=fread($file,filesize("join.html"));
	echo $content;	
}
else
{
	echo "无权进入！！！";
}

?>

<script>
	console.log(document.getElementById('id').innerText)
	
	
	
</script>