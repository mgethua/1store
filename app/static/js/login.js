var loginCheck ={
    username(str) {
        var reg = /^\w{6,14}$/;
        return reg.test(str);
    },
    password(str) {
        var reg = /^\w{6,20}$/;
        return reg.test(str);
    },
}
var login = (function(){
    return{
        init(ele){
            this.$el = document.querySelector(ele);
            this.$btn = this.$el.querySelector('.btn');
            this.$inputAll = this.$el.querySelector('.init');
            this.$user = this.$el.querySelector('.username');
            this.$pass = this.$el.querySelector('.password');
            this.event()
        },
        event(){
            var _this=this;
            // _this.$btn.onclick=function(){
            //     sendAjax()
            // }
        }
    }
}())