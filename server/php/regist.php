<?php
    header("Content-type: text/html; charset=UTF-8");
    $username = $_POST["username"];
    $phone = $_POST["phone"];
    $password = $_POST["password"];
    $coon = new mysqli('localhost','root','','db_student_admin',3306);
    $sql = 'select*from user_info';
    $insert_sql = "INSERT INTO user_info(username,phone,password) VALUES ('$username','$phone','$password')";
    $coon->query("SET CHARACTER SET 'utf8'");
    $coon->query("SET NAMES 'uft8'");
    $result=$coon->query($insert_sql);

?>