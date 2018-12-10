var shopcar = (function(){
    return {
        init(ele){
            this.$carlist = document.querySelector(ele);
            this.$listData = this.$carlist.querySelector(".list_data");
            this.event();
            
        },
        event(){
            var _this = this;
        },
        getData(){
            
        },
        insertData(data) {
            for(let i = 0; i<data.length;i++){
                var $li = document.createElement('li');

            }
        }
    }
}())