<?php
    header("Content-type: text/html; charset=UTF-8");
    $username = $_POST['username'];
    $password = $_POST['password'];
    $coon=new mysqli('localhost','root','','db_student_admin',3306);
    $sql='select*from user_info';
    $row=$coon->query($sql);
    $insert_sql="SELECT*from user_info WHERE username='$username'";
    $coon->query("SET CHARACTER SET 'utf8'");
    $coon->query("SET NAMES 'uft8'");
    $result=$coon->query($insert_sql);
    $result=$result->fetch_assoc();
    // $result = json_encode($result);
    if($result){
        echo "1";
    }else{
        echo "2";
    }

?>