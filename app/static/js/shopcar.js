var shopcar = (function(){
    return {
        init(ele){
            this.$carlist = document.querySelector(ele);
            this.$ul = document.querySelector('.list_data')
            this.getData()
            this.event();
            
        },
        event(){
            var _this = this;
        },
        getData(){
            let shoplist=JSON.parse(localStorage.shopList);
            console.log(shoplist)
            this.insertData(shoplist)
        },
        insertData(shoplist) {
            for(let i = 0; i<shoplist.length;i++){
                var $li = document.createElement('li');
                $li.className='practical';
                $li.innerHTML = `
                <div class="practical_data">
                <input type="checkbox" class="dan"><img src="${shoplist[i].src3}" class="imag"><a href="#" class="describe">${shoplist[i].describe}</a>
                <!--单价及价格的标签-->
                <div class="item_price">
                    <p>
                    ${shoplist[i].price}
                    </p>
                </div>
                <!--数量-->
                <div class="item_num">
                    <div class="zong">
                        <button class="reduce">-</button><input type="text" value="${shoplist[i].num}"><button class="add">+</button>
                    </div>
                </div>
                <!--小计-->
                <div class="item_amount">
                    <div class="item_a_money">
                    ${shoplist[i].money}
                    </div>
                    <div class="item_a_weight">
                    ${shoplist[i].weight}
                    </div>
                </div>
                <!--操作-->
                <div class="item_act">
                    <a href="#"><i class="iconfont icon-02"></i></a><a href="#"><i class="iconfont icon-lajitong"></i></a>
                </div>
            </div>`
                    this.$ul.appendChild($li)
            }
        }
    }
}())