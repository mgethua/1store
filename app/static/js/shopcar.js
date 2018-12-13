var shopcar = (function(){
    return {
        init(ele){
            this.$carlist = document.querySelector(ele);
            this.$ul = document.querySelector('.list_data');
            this.$amount = document.querySelector('.amount');
            this.$zongMoney = this.$amount.querySelector('span');
            this.$checkAll = $('.check-all');
            this.$checkAll2 = $('.check-all2');
            this.$allInput =  null;
            this.$addAll = null;
            this.$reduceAll= null;
            this.shoplist = null;
            this.$momeyAll = null;
            this.$trash = null;
            this.sum = 0;
            this.getData()           
            this.event();
            
        },
        event(){
            var _this = this;
            this.counts();
            _this.check();
            //加,减按钮功能模块
            for(let i = 0; i < _this.$addAll.length; i++) {
                (function() {
                    var  count = _this.shoplist[i].num
                    _this.$addAll[i].onclick = function() {
                        count++;
                        _this.shoplist[i].num =count;
                        _this.shoplist[i].money = (count * _this.shoplist[i].price).toFixed(2);
                        this.parentNode.querySelector('input').value=count;
                        _this.$momey[i].innerHTML = _this.shoplist[i].money
                        localStorage.shopList = JSON.stringify(_this.shoplist);
                        _this.counts()
                    }
                    _this.$reduceAll[i].onclick = function() {
                        count--;
                        _this.shoplist[i].num =count;
                        _this.shoplist[i].money = (count * _this.shoplist[i].price).toFixed(2);
                        this.parentNode.querySelector('input').value=count;
                        _this.$momey[i].innerHTML = _this.shoplist[i].money;
                        localStorage.shopList = JSON.stringify(_this.shoplist);
                        _this.counts()
                        if(count<1){
                            count = 1;
                            _this.shoplist[i].num =count;
                            _this.shoplist[i].money = (count * _this.shoplist[i].price).toFixed(2);
                            this.parentNode.querySelector('input').value=count;
                            _this.$momey[i].innerHTML = _this.shoplist[i].money;
                            localStorage.shopList = JSON.stringify(_this.shoplist);
                            _this.counts()
                        }
                    }
                }())
            }
            //删除商品数据功能模块
            for(let f = 0;f<_this.$trash.length;f++){
                _this.$trash[f].onclick=function(){
                    var trashfather = _this.$trash[f].parentNode.parentNode.parentNode.parentNode
                    _this.$ul.removeChild(trashfather)
                    _this.shoplist.splice(trashfather.index, 1);
                    localStorage.shopList = JSON.stringify(_this.shoplist);
                    _this.counts()
                }
            }
        },
        getData(){
            this.shoplist=JSON.parse(localStorage.shopList);
            this.insertData(this.shoplist)
            this.$addAll = document.querySelectorAll('.add');
            this.$reduceAll = document.querySelectorAll('.reduce');
            this.$momey = document.querySelectorAll('.item_a_money');
            this.$trash = document.querySelectorAll('.icon-lajitong');
            this.$allInput =  $('.list_data .dan');
        },
        insertData(shoplist) {
            for(let i = 0; i<shoplist.length;i++){
                var $li = document.createElement('li');
                $li.index = i;
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
        },
        counts(){
            this.sum = 0
            for(let r=0 ; r<this.shoplist.length;r++){
                this.shoplist[r].money = Number(this.shoplist[r].money)
                this.sum += this.shoplist[r].money
                this.sum.toFixed(2)
                this.$zongMoney.innerHTML = `${this.sum}`
            }
        },
        //全选功能模块
        check(){
            var $checkAll = $('.check-all');
            var $checkAll2 = $('.check-all2');
            var $allInput =  $('.list_data .dan');
            this.$checkAll.click(function() {
                if($(this).prop('checked')) {
                   $allInput.prop('checked', 'true');
                } else {
                   $allInput.prop('checked', false);
                }
            })
           this.$allInput.click(function() {
               var flag = true;
               $allInput.each(function(i){
                //    有一个没有被选中
                    if(!$(this).prop('checked')) {
                        // 让全选按钮不被选中
                        $checkAll.prop('checked', false);s
                        flag = false;
                        // 终止each循环
                        return
                    }
                })
                if(flag){
                    $checkAll.prop('checked', true);  
                } 
            })
        }
    }
}())