var $username = document.querySelector('.username');
var $xieyi = document.querySelector('.xieyi');
var $two_code = document.querySelector('.two_code');
var $codeBox = document.querySelector('.codeBox');
var $pc = document.querySelector('.pc');
var $form_footer =document.querySelector('.form_footer');
var $icon =document.querySelector('.icon');
var $iconAll =document.querySelector('.iconAll');
var $main =document.querySelector('.main');
var $pass = document.querySelector('.password');
var $passSpan = document.querySelector('.mim');
$two_code.onclick=function(){
    $codeBox.style.zIndex="1"
}
$pc.onclick=function(){
    $codeBox.style.zIndex="-1"
}
$icon.onclick=function(){
    if($iconAll.style.display =='block'){
        $iconAll.style.display ='none';
        $main.style.height= '440px'
    } else{
        $iconAll.style.display ='block';
        $main.style.height= '520px'
    } 
}
$pass.onfocus=function(){
    $passSpan.style.display='none';
}
$username.onblur=function(){
    $xieyi.style.display='inline-block';
}
$xieyi.style.paddingLeft="40px";
$xieyi.style.display="none";
$xieyi.style.marginTop="10px";