var checkInput = {
    username(str) {
        var reg = /^\w{6,14}$/;
        return reg.test(str);
    },
    password(str) {
        var reg = /^\w{6,20}$/;
        return reg.test(str);
    },
    phone(str) {
        var reg = /^1[35789]\d{9}$/;
        return reg.test(str);
    },
    code(str) {
        var reg = /^666666$/;
        return reg.test(str);
    },
    email(str) {

    }
}

var register = (function () {
    return {
        init(ele) {
            this.$el = document.querySelector(ele);
            this.$inputAll = this.$el.querySelectorAll('input');
            this.$spanAll = this.$el.querySelectorAll('span');
            this.$btn = this.$el.querySelector('.getcode')
            console.log(this.$inputAll);
            console.log(this.$spanAll);
            this.timer = null;
            this.event();
        },
        event() {
            var _this = this;
            for (let i = 0; i < _this.$inputAll.length; i++) {
                _this.$inputAll[i].onfocus = function () {
                    var $i = this.nextElementSibling;
                    $i.style.display = 'inline-block'
                    _this.$spanAll[i].style.left = -75 + 'px'
                }
                _this.$inputAll[i].onblur = function () {
                    var $i = this.nextElementSibling;
                    if (this.value == '') {
                        $i.innerHTML = `内容不能为空`
                        $i.style.padding = 10 + 'px';
                        if (_this.$spanAll[i].innerHTML == '短信验证码') {
                            $i.innerHTML = '获取验证码'
                        }
                        if (_this.$spanAll[i].innerHTML == '确认密码') {
                            $i.innerHTML = '请再次输入密码'
                        }
                    } else{
                        var bool = checkInput[this.name](this.value);
                        if(bool){
                            //验证成功
                            $i.innerHTML = '<img src="image/success.png">';
                            $i.style.padding = 0;
                            console.log(_this.$inputAll[i].value)
                            if(bool && i==0){
                                sendAjax("php/check.php",{
                                    method:'post',
                                    data:_this.$inputAll[i].value
                                })
                                .then(data=>{
                                    if(data == '1'){
                                        $i.innerHTML = '用户名已经被注册';
                                        $i.style.padding = 10 + 'px';
                                    } else{
                                        $i.innerHTML = '<img src="image/success.png">';
                                        $i.style.padding = 0;
                                    }
                                })
                            }
                            if(_this.$spanAll[i].innerHTML == '手机号'){
                                _this.$btn.disabled = '';
                                _this.$btn.onclick=function(){
                                    clearInterval(this.timer);
                                    var $b=_this.$btn.querySelector('b');
                                    console.log(this)
                                    var $this=this;
                                    var num=60;
                                    $this.timer=setInterval(function(){
                                        num--;
                                        console.log($b)
                                        $b.innerHTML=num;
                                        _this.$btn.disabled="disabled";
                                        if(num == 0){
                                            $b.innerHTML='';
                                            _this.$btn.disabled='';
                                            clearInterval($this.timer);
                                        }
                                    },1000)
                                }
                            }
                            if(_this.$spanAll[i].innerHTML == '短信验证码'){
                                $i.innerHTML = `获取验证码<b></b>`
                                var $coedStatu = this.nextElementSibling.nextElementSibling;
                                $coedStatu.style.display = 'inline-block';
                                $coedStatu.style.padding = 0;
                                $coedStatu.innerHTML = '<img src="image/success.png">';
                                console.log($coedStatu)
                            }
                        } else{
                            $i.innerHTML = '格式错误！！！！';
                            if (_this.$spanAll[i].innerHTML == '手机号') {
                                _this.$btn.disabled = "disabled"
                            }
                            if (_this.$spanAll[i].innerHTML == '短信验证码'){
                                $i.innerHTML = `获取验证码<b></b>`
                                var $coedStatu = this.nextElementSibling.nextElementSibling;
                                $coedStatu.style.display = 'inline-block';
                                $coedStatu.style.padding = 0;
                                $coedStatu.innerHTML = '<img src="image/error.png">';
                            }
                        }
                    }
                }
            }
            this.$el['password'].addEventListener('blur', function() {
                _this.$el['passwordset'].onblur();
            })
            this.$el['passwordset'].onblur = function() {
                var $i = this.nextElementSibling;
                if(this.value === _this.$el['password'].value) {
                    $i.innerHTML = '<img src="image/success.png">';
                    $i.style.padding = 0;
                } else {
                    $i.innerHTML = '你输入的密码与上次不匹配';
                }
            }
            this.$el['submit'].onclick = function() {
                var $iAll = _this.$el.querySelectorAll('i');
                console.log($iAll)
                for(let i = 0; i < $iAll.length; i++) {
                    if($iAll[i].innerHTML.indexOf('<img src="image/success.png">') == -1) {
                        $iAll[i].previousElementSibling.focus();
                        if(i == 2){
                            $iAll[i].previousElementSibling.previousElementSibling.focus();
                        }
                        return;
                    }
                    if(i == $iAll.length-1){
                        console.log(_this.$el)
                        _this.$el.onsubmit= "return true";
                    }
                }
            }
        } 
    }
}())