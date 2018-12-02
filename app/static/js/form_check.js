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
                        if (_this.$spanAll[i].innerHTML == '短信验证码') {
                            $i.innerHTML = '获取验证码'
                        }
                        if (_this.$spanAll[i].innerHTML == '确认密码') {
                            $i.innerHTML = '请再次输入密码'
                        }
                    } else {
                        var bool = checkInput[this.name](this.value);
                        if (bool) {
                            // 验证成功
                            $i.innerHTML = '<img src="image/success.png">';
                            $i.style.padding = 0;
                            if (_this.$spanAll[i].innerHTML == '手机号') {
                                _this.$btn.disabled = '';
                                _this.$btn.onclick = function () {
                                    clearInterval(_this.timer)
                                    var num=5;
                                    this.timer=setInterval(function(){                                        
                                        var $b=_this.$btn.querySelector('b')
                                        clearInterval(_this.timer)
                                            num--;
                                            $b.innerHTML=num;
                                            _this.$btn.disabled = 'disabled'
                                            if(num == 0){
                                                clearInterval(this.time)
                                            }        
                                    },1000)
                                //     if(num == 0){
                                //         $b.innerHTML='';
                                //         _this.$btn.disabled = '';
                                //         clearInterval(_this.timer)
                                //         console.log(num)
                                // }
                                }

                                if (_this.$spanAll[i].innerHTML == '短信验证码') {

                                    $i.innerHTML = `获取短信验证码`
                                    var $i2 = this.nextElementSibling.nextElementSibling;
                                    console.log($i2)
                                    $i2.style.display = "inline-block"
                                    $i2.style.padding = 0
                                    $i2.innerHTML = '<img src="image/success.png">'
                                }
                            }
                            else {
                                // 验证失败
                                $i.innerHTML = '格式错误！！！！';
                                $i.className += ' error'
                                if (_this.$spanAll[i].innerHTML == '手机号') {
                                    _this.$btn.disabled = "disabled"
                                }
                                if (_this.$spanAll[i].innerHTML == '短信验证码') {
                                    $i.innerHTML = '获取验证码'
                                    var $i2 = this.nextElementSibling.nextElementSibling;
                                    $i2.style.display = 'inline-block';
                                    $i2.style.padding = 0
                                    $i2.innerHTML = '<img src="image/error.png">'
                                }
                            }
                        }
                    }
                }
                // this.timer=setInterval(function(){
                //     var num=60;
                //     num--;
                // },1000)
            }
            
        }
    }
}())