<?php
$test=array("test",12345678);
echo $test[0];
echo $test[1];
echo "<br>";
echo "访问者输入域名：";
echo $_SERVER['REQUEST_URI'];
echo "<br>";
if ($_POST["id"]=$test[0] && $_POST["password"]=$test[1])
{
	
	echo "欢迎加入会议！！！";
	
};
?>

<script>
	var a={name:123,}
	console.log(a.name)

</script>
