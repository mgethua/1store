<?php
    header("Content-type: text/html; charset=UTF-8");
    $requestData = file_get_contents("php://input");
    $requestData = json_decode($requestData);
    $coon=new mysqli('localhost','root','','db_student_admin',3306);
    $sql='select*from user_info';
    $row=$coon->query($sql);
    $insert_sql="SELECT*from user_info WHERE username='$requestData'";
    $coon->query("SET CHARACTER SET 'utf8'");
    $coon->query("SET NAMES 'uft8'");
    $result=$coon->query($insert_sql);
    $result=$result->fetch_assoc();
    if($result) {
        //  查到数据
        echo"1";
    } else {
        // 没有查询到
        echo"0";
    }



?>