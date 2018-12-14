var detail = (function () {
	return {
		init(ele) {
			this.$ele = document.querySelector(ele);
			this.$box1 = this.$ele.querySelector('.box1');
			this.getData();
			this.event();
		},
		event() {
			var _this = this;

		},
		getData() {
			var id = localStorage.id
			console.log(id)
			var _this = this
			$.get('js/data.json', (res) => {
				this.data = res[id];
				this.insertData(this.data, id);
				this.$add.onclick = function () {
					_this.$count.value = Number(_this.$count.value) + 1;
					_this.data.num = _this.$count.value;
					_this.data.money = (_this.$count.value * _this.data.price).toFixed(2);
					_this.setItem(_this.data)
				}
				this.$reduce.onclick = function () {
					_this.$count.value = Number(_this.$count.value) - 1;
					_this.data.num = _this.$count.value;
					if(_this.$count.value < 1){
						_this.$count.value = 1
						_this.data.num = _this.$count.value;
					}
					_this.data.money = (_this.$count.value * _this.data.price).toFixed(2);
					_this.setItem(_this.data)
				}
				this.$join.onclick = function () {
					_this.setItem(_this.data)
					window.location = "shopcar.html";
				}
			})
		},
		insertData(data, id) {
			data.src2 = data.src.replace("small", "big");
			data.src3 = data.src.replace("small", "zuismall");
			this.$box1.innerHTML = `
            <section class="box1">
			<div class="show-image">
				<img src="${data.src}" alt=""><span class="filter"></span>
			</div>
			<div class="show-big-image">
				<img src="${data.src2}" alt="" id="big-image">
			</div>
			<ul class="img-box">
				<li class="active"><img src="${data.src3}" alt=""></li>
				<li><img src="image/fdjimg/zuismall${id * 3 + 2}.jpg" alt=""></li>
				<li><img src="image/fdjimg/zuismall${id * 3 + 3}.jpg" alt=""></li>
			</ul>
		</section>
		<section class="substance">
			<div class="details">
				<h1>${data.describe}</h1>
			</div>
			<div class="price">
				<ul class="clearfix">
					<li class="pricel">价格</li>
					<li class="number"><span class="current_price">¥${data.money}</span></li>
				</ul>
			</div>
			<ul class="comment">
				<li><span><a href="#" class="front"><i class="iconfont icon-zan"></i> 好评率 <b>98%</b></a></span><span><a href="#"
						 class="behind">[评论 <span>400+</span> 条]</a></span></li>
			</ul>
			<div class="discount">
				<dl>
					<dt>优惠券</dt>
					<dd>
						<div class="range">
							<b>满339减80</b><b>满199减40</b><b>满999减300</b><b>满599减120</b>
						</div>
						<div class="draw">
							<span>领取优惠券</span><i class="iconfont icon-xiajiantou"></i>
						</div>
					</dd>
				</dl>
			</div>
			<div class="choose">
				选择产品: <span>${data.choose[0]}</span><span>${data.choose[1]}</span><span>${data.choose[2]}</span>
			</div>
			<div class="sendto">
				送货至 <a href="#">上海静安区城区<i class="iconfont icon-xiajiantou"></i></a> 有货,店铺单笔订单不满79元,在线支付运费5元
				<p>
					由贝克大药房旗舰店从湖北武汉市发货,并提供售后服务
				</p>
				<div class="car">
					<input type="text" value="${data.num}" class="count">
					<div class="compute">
						<button class="add">+</button><button class="reduce">-</button>
					</div>
					<button class="join"><i class="iconfont icon-gouwuche"></i>加入购物车</button>
				</div>
            </div>
        </section>
        `
			glass.init(3)
			this.$add = this.$ele.querySelector('.add');
			this.$reduce = this.$ele.querySelector('.reduce');
			this.$count = this.$ele.querySelector('.count');
			this.$join = this.$ele.querySelector('.join');
		},
		setItem(data) {
			// 现获取原有数据
			var shopList = localStorage.getItem('shopList') || '[]';
			shopList = JSON.parse(shopList);
			// console.log(shopList, data);
			// 判断购物数据中, 是否存在当前商品
			for (var i = 0; i < shopList.length; i++) {
				if (data.id == shopList[i].id) {
					// 此商品已经存在
					shopList[i]= data;
					console.log(shopList[i].num,data.num)
					break;
				}
			}
			if (i == shopList.length) {
				// 商品不存在
				shopList.push(data);

			}
			// shopList[i].count += data.count;
			// 在把全部数据存到本地
			localStorage.shopList = JSON.stringify(shopList);
			// console.log(shopList);

		}
	}
}())