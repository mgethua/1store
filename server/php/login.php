<?php
    header("Access-Control-Allow-Origin:*");
    $requestData = file_get_contents("php://input");
    $requestData = json_decode($requestData);
    foreach($requestData as $key=>$value){
        if($key == 'username'){
            $username=$value;
        }
        if($key == 'password'){
            $password=$value;
        }
    }
    $coon=new mysqli('localhost','root','','db_student_admin',3306);
    $sql='select*from user_info';
    $row=$coon->query($sql);
    $insert_sql="SELECT*from user_info WHERE username='$username'";
    $init="SELECT*from user_info WHERE password='$password'";
    $coon->query("SET CHARACTER SET 'utf8'");
    $coon->query("SET NAMES 'uft8'");
    $result=$coon->query($insert_sql);
    $result=$result->fetch_assoc();
    if($result){
        foreach($result as $key=>$value){
            if($value == $password){
                echo "1";
            }
        }
    }else{
        echo "2";
    }

?>