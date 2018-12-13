
var login = (function(){
    return{
        init(ele){
            this.$el = document.querySelector(ele);
            this.$btn = this.$el.querySelector('.btn');
            this.$inputAll = this.$el.querySelector('.init');
            this.$user = this.$el.querySelector('.username');
            this.$pass = this.$el.querySelector('.password');
            this.$tip = this.$el.querySelector('.tip');
            this.event()
        },
        event(){
            var _this=this;
            _this.$btn.onclick=function(){
                sendAjax('http://10.36.141.193:7893/1store/server/php/login.php',{
                    method:'post',
                    data:{
                        username:_this.$user.value,
                        password:_this.$pass.value
                    }
                })
                .then(data=>{
                    if(data == "11"){
                        _this.$btn.onclick=function(){
                            window.location="store.html";
                        }
                        _this.$btn.click();
                    } else{
                        _this.$tip.style.display = 'block'
                    }
                })
            }
        }
    }
}())