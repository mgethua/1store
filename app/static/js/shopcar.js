var shopcar = (function(){
    return {
        init(ele){
            this.$carlist = document.querySelector(ele);
            this.$ul = document.querySelector('.list_data')
            this.$addAll = null;
            this.$reduceAll= null;
            this.shoplist = null;
            this.$momeyAll = null;
            this.$trash = null;
            this.getData()           
            this.event();
            
        },
        event(){
            var _this = this;
            for(let i = 0; i < _this.$addAll.length; i++) {
                (function() {
                    var  count = _this.shoplist[i].num
                    _this.$addAll[i].onclick = function() {
                        count++;
                        _this.shoplist[i].num =count;
                        _this.shoplist[i].money = (count * _this.shoplist[i].price).toFixed(2);
                        this.parentNode.querySelector('input').value=count;
                        _this.$momey[i].innerHTML = _this.shoplist[i].money
                    }
                    _this.$reduceAll[i].onclick = function() {
                        count--;
                        _this.shoplist[i].num =count;
                        _this.shoplist[i].money = (count * _this.shoplist[i].price).toFixed(2);
                        this.parentNode.querySelector('input').value=count;
                        _this.$momey[i].innerHTML = _this.shoplist[i].money
                        if(count<1){
                            count = 1;
                            _this.shoplist[i].num =count;
                            _this.shoplist[i].money = (count * _this.shoplist[i].price).toFixed(2);
                            this.parentNode.querySelector('input').value=count;
                            _this.$momey[i].innerHTML = _this.shoplist[i].money
                        }
                    }
                }())
            }
            for(let f = 0;f<_this.$trash.length;f++){
                _this.$trash[f].onclick=function(){
                    var trashfather = _this.$trash[f].parentNode.parentNode.parentNode.parentNode
                    _this.$ul.removeChild(trashfather)
                    _this.shoplist[f] = null;
                    console.log(_this.shoplist)
                }
            }
            // _this.$ul.onclick=function(e){
            //     e = e || window.event;
            //     var target = e.target || e.srcElement;
            //     console.log(1)
            //     if(target.className == 'trash'){
            //         console.log(1)
            //         console.log(target.parentNode.parentNode.parentNode.parentNode)
            //     }
                
            // }
        
        },
        getData(){
            this.shoplist=JSON.parse(localStorage.shopList);
            this.insertData(this.shoplist)
            this.$addAll = document.querySelectorAll('.add');
            this.$reduceAll = document.querySelectorAll('.reduce');
            this.$momey = document.querySelectorAll('.item_a_money');
            this.$trash = document.querySelectorAll('.icon-lajitong');
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
                        <button class="reduce">-</button><input type="text" class="count" value="${shoplist[i].num}"><button class="add">+</button>
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
                    <a href="#"><i class="iconfont icon-02"></i></a><a href="#"><i class="trash iconfont icon-lajitong"></i></a>
                </div>
            </div>`
                    this.$ul.appendChild($li)
            }
        }
    }
}())