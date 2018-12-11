var render=(function(){
    return {
        init(ele){
            this.$ele = document.querySelector(ele)
            this.getData();
            this.event();
        },
        event(){
            var _this=this;
            console.log(_this.$ele)
            _this.$ele.onclick = function(e){
                e=e||window.event;
                var target = e.target || e.srcElement;
                var index=target.parentNode.parentNode.index;
                var data=_this.data[index];
                localStorage.clear();
                localStorage.id = index;
                window.location="shoplist.html";
            }
        },
        getData(){
            $.get('../php/data.json',(res)=>{
                this.data=res;
                console.log(this.data);
                this.insertData(res);
            })
        },
        insertData(res){
            for( let i=0 ;i<res.length;i++){
                var $a = document.createElement('a')
                $a.href = '#';
                $a.className = 'abox';
                var $li=document.createElement('li');
                $li.index=i;
                $li.innerHTML = `<div class="imgbox">
                                    <img src="${res[i].src}">
                                </div>
                                <div class='other'>
                                    <p class="describe">${res[i].describe}</p>
                                    <p class="price">
                                        ¥
                                        <span>${res[i].price}</span>
                                    </p>
                                </div>`
                $a.appendChild($li);
                this.$ele.appendChild($a);
            }
        },
        // 把商品数据存储到本地
        setItem(data){
            var shopList = localStorage.getItem('shopList') || '[]';
            shopList = JSON.parse(shopList);
            shopList.push(data);
            // 判断购物数据中, 是否存在当前商品
            for(var i = 0; i < shopList.length; i++) {
                if(data.id == shopList[i].id) {
                    // 此商品已经存在
                    shopList[i].num += data.num;
                    break;
                }
            }
            if(i == shopList.length) {
                // 商品不存在
                shopList.push(data);
            }
            localStorage.shopList = JSON.stringify(shopList);
        }
    }
}())