<!DOCTYPE html> 
<html> 
<body> 

<?php

//连接数据库
$servername = "localhost";
$username = "test";
$password = "88888888";
$dbname = "test";
 
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("连接失败: " . mysqli_connect_error());
}
 
$sql = "SELECT id, name FROM test1";
$result = mysqli_query($conn, $sql);
 
if (mysqli_num_rows($result) > 0) {
    // 输出数据
    while($row = mysqli_fetch_assoc($result)) {
        echo "id: " . $row["id"]. " - Name: " . $row["name"].  "<br>";
    }
} else {
    echo "0 结果";
} 
mysqli_close($conn);

//读文件

$file = fopen("test.txt", "r") or exit("无法打开文件!");
// 读取文件每一行，直到文件结尾
while(!feof($file))
{
    echo fgets($file). "<br>";
}
fclose($file);

//写文件

$d=date("Ymd");
touch("log/$d.txt");




?>

</body> 
</html>