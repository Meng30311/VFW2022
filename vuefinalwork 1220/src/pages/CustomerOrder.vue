<template>
  <div>
    <div class="orderImg"></div>
    <div class="container ordercontainer" style="width:100%">
      <loading :active.sync="isLoading">
        <img src="@/assets/img/loading.png" class="ld ld-dim" width="400">
      </loading>
      <div class="order">
        <ul id="progressbar" class="d-flex justify-content-between">
          <li id="step1" :class="{'active':current >= 1}"><strong>訂購人資料</strong></li>
          <li id="step2" :class="{'active':current >= 2}"><strong>訂單確認</strong></li>
          <li id="step3" :class="{'active':current === 3}"><strong>完成付款</strong></li>
        </ul>

        <div v-if="current === 1 && !isLoading">
          <div class="stepContent1">
            <div class="row">
              <div class="col-8 d-flex justify-content-center">
                <table class="table mt-4 table-sm" v-if="cart.carts.length > 0">
                  <thead class="orderThead">
                    <tr style="font-size:18px">
                      <th width="100"></th>
                      <th width="390"></th>
                      <th class="text-center p-3" width="160">品名</th>
                      <th class="text-center p-3" width="110">數量</th>
                      <th class="text-center p-3" width="100">單價</th>
                    </tr>
                  </thead>
                  <tbody class="orderTbody">
                    <tr v-for="item in cart.carts" :key="item.id" style="font-size:16px">
                      <td class="text-center p-3" width="100">
                        <a href="#" class="btn btn-outline-danger btn-sm" @click.prevent="removeCart(item.id)"><i
                            class="far fa-trash-alt"></i></a>
                      </td>
                      <td height="150" width="390">
                        <div :style="{backgroundImage:`url(${item.product.imageUrl})`}" class="h-100"></div>
                      </td>
                      <td class="text-center p-3" width="150">
                        {{item.product.title}}
                        <div class="text-success" v-if="item.coupon">
                          已套用優惠券
                        </div>
                      </td>
                      <td class="text-right p-3" width="100">{{item.qty}}</td>
                      <td class="text-right p-3" width="100">{{item.total}}</td>
                    </tr>
                  </tbody>
                  <tfoot style="font-size:15px" class="orderTfoot">
                    <tr>
                      <td colspan="4" class="text-right p-3">總計</td>
                      <td class="text-right p-3">{{cart.total}}</td>
                    </tr>
                    <tr v-if="cart.final_total !== cart.total">
                      <td colspan="3" class="text-right p-3 text-success">折扣價</td>
                      <td class="text-right p-3 text-success">{{cart.final_total}}</td>
                    </tr>
                  </tfoot>
                </table>
                <div class="noCart d-flex" v-if="cart.carts.length === 0">
                  <img src="https://www.astralweb.com.tw/wp-content/uploads/2015/02/abc.jpg" alt="" height="500">
                  <p class="mt-3">購物車是空的</p>
                </div>
              </div>
              <ValidationObserver v-slot="{ handleSubmit }" tag="div" class="formWrap col-4">
                <form @submit.prevent="handleSubmit(next)" id="info">
                  <div class="form-group">
                    <label for="useremail">Email</label>
                    <ValidationProvider rules="email|required" v-slot="{ errors,classes }">
                      <input type="email" name="email" id="useremail" placeholder="請輸入 Email" :class="classes"
                        class="form-control untouched pristine required" v-model="form.user.email">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="form-group">
                    <label for="username">收件人姓名</label>
                    <ValidationProvider rules="required" v-slot="{ errors,classes }">
                      <input type="text" name="姓名" id="username" placeholder="輸入姓名" :class="classes"
                        class="form-control untouched pristine required" v-model="form.user.name">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="form-group">
                    <label for="usertel">收件人電話</label>
                    <ValidationProvider rules="required|digits:10" v-slot="{ errors,classes }">
                      <input type="tel" id="usertel" placeholder="請輸入電話" :class="classes"
                        class="form-control untouched pristine required" v-model="form.user.tel">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="form-group">
                    <label for="useraddress">收件人地址</label>
                    <ValidationProvider rules="required" v-slot="{ errors,classes }">
                      <input type="text" name="address" id="useraddress" placeholder="請輸入地址" :class="classes"
                        class="form-control untouched pristine required" v-model="form.user.address">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="form-group">
                    <label for="comment">留言</label>
                    <textarea name="" id="comment" cols="30" rows="10" class="form-control"></textarea>
                  </div>
                </form>
              </ValidationObserver>
            </div>
            <button type="submit" class="next-step" form="info">訂單確認</button>
          </div>
        </div>

        <div class="table" v-if="current === 2">
          <div class="stepContent2 row">
            <div class="col-8">
              <div>
                <div class="accordion" id="accordion" v-for="item in singleOrder" :key="item.create_at">
                  <div class="card">
                    <h2 class="mb-0">
                      <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse"
                        :data-target="'#'+item.id[0]">
                        訂單No.{{item.num}}
                      </button>
                    </h2>
                  </div>
                  <div :id="item.id[0]" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body">
                      <div class="orderContent">
                        <table class="table table-sm">
                          <template v-for="value in item.order">
                            <tr class="orderTr">
                              <td width="200">{{value.product.title}}</td>
                              <td>
                                <div :style="{backgroundImage:`url(${value.product.imageUrl})`}" class="orderImg2">
                                </div>
                              </td>
                              <td>{{value.qty}}</td>
                              <td>{{value.total}}</td>
                            </tr>
                          </template>
                          <tr>
                            <td colspan="3" style="text-align:right">總計</td>
                            <td style="text-align:center">{{item.total}}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="orderTotal">
                <span>總計</span><span>{{orderTotal}}</span>
              </div>
              <div class="input-group my-3 code">
                <input type="text" class="form-control" placeholder="請輸入優惠碼" aria-label="Recipient's username"
                  aria-describedby="basic-addon2" v-model="coupon_code">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" id="basic-addon2" @click="addCouponCode()">套用優惠碼</button>
                </div>
              </div>
            </div>
            <div class="col-4">
              <table class="table table-sm info">
                <tr>
                  <th width="100">姓名</th>
                  <th>地址</th>
                  <th>Email</th>
                  <th>電話</th>
                </tr>
                <tr v-for="item in singleOrder">
                  <td width="100">{{item.user.name}}</td>
                  <td>{{item.user.address}}</td>
                  <td>{{item.user.email}}</td>
                  <td>{{item.user.tel}}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>

        <div v-if="current === 3 && !isLoading">
          <div class="stepContent3">
            <span><i class="fas fa-check"></i></span>
            <p>付款完成</p>
          </div>
        </div>
        <div class="fieldset" v-if="current === 2">
          <input type="button" name="next-step" class="next-step" value="完成付款" @click="next()">
          <input type="button" name="previous-step" v-if="current>1" class="previous-step" value="上一步" @click="prev()">
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
  import Footer from '@/components/Footer'
  import $ from 'jquery'

  export default {
    components: {
      Footer,
    },
    data() {
      return {
        cart: {
          carts: {},
        },
        order: {},
        coupon_code: '',
        current: 1,
        step1after: '',
        step2after: '',
        isLoading: false,
        form: {
          user: {
            email: '',
            name: '',
            tel: '',
            address: ''
          },
        },
        customerOrder: {},
        singleOrder: [],
        orderId: [],
        orderTotal: 0,
        checked:false,
        isLogin:false,
      }
    },
    methods: {
      removeCart(id) {
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
        const vm = this;
        this.$http.delete(api).then(response => {
          if (response.data.success) {
            vm.getCart();
            vm.$bus.$emit('getCartInfo');
            vm.$bus.$emit('message:push', '刪除成功', 'danger');
          };
        });
      },
      addCouponCode() {
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
        const coupon = {
          code: vm.coupon_code
        };
        this.$http.post(api, {
          data: coupon
        }).then(response => {
          if (response.data.success) {
            alert('已套用優惠券');
          } else {
            alert('優惠券不存在');
          }
        });
        vm.coupon_code = '';
      },
      getCart() {
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        const vm = this;
        this.isLoading = true;
        this.$http.get(api).then(response => {
          vm.cart = response.data.data;
          vm.isLoading = false;
        });
      },
      next() {
        const vm = this;
        let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
        const order = vm.form;
        vm.current++;
        if (vm.current === 2) {
          if(vm.cart.carts.length !== 0){
            vm.$http.post(api, {data: order}).then(response => {
            vm.$bus.$emit('getCartInfo');
            });
            api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/orders`;
            vm.$http.get(api).then(response => {
              vm.customerOrder = response.data;
              console.log(vm.customerOrder);
            });
          }else{
            alert('購物車是空的');
            vm.$router.push('/products');
          };
        };
        if(vm.current === 3){
          const vm=this;
          vm.customerOrder.orders.map(item =>{
            const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${item.id}`;
            vm.isLoading=true;
            vm.$http.post(api).then(response=>{
              if(response.data.success){
                vm.checked=true;
                vm.isLoading=false;
              }
              console.log(response.data)
            });
          });
        };
        const root = document.documentElement;
        if (vm.current >= 2) {
          vm.step1after = 'rgb(102, 204, 255)';
          root.style.setProperty('--Bgc1', `${vm.step1after}`);
        };
        if (vm.current >= 3) {
          vm.step2after = 'rgb(102, 204, 255)';
          root.style.setProperty('--Bgc2', `${vm.step2after}`);
        };
      },
      prev() {
        const vm = this;
        vm.current--;
        const root = document.documentElement;
        if (vm.current < 3) {
          vm.step2after = 'lightgray';
          root.style.setProperty('--Bgc2', `${vm.step2after}`);
        };
        if (vm.current < 2) {
          vm.step1after = 'lightgray';
          root.style.setProperty('--Bgc1', `${vm.step1after}`);
        };
      },
    },
    created() {
      const vm = this;
      
      this.getCart();
      this.$bus.$on('getCart', () => {
        vm.getCart();
      });
      const root = document.documentElement;
      root.style.setProperty('--Bgc1', 'lightgray');
      root.style.setProperty('--Bgc2', 'lightgray');
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/orders`;
      vm.$http.get(api).then(response => {
        vm.customerOrder = response.data;
        vm.orderId = vm.customerOrder.orders.map(item => {
          return Object.keys(item.products);
        });
        vm.customerOrder.orders.map((item, index) => {
          const orderIndex = index;
          const id = vm.orderId[orderIndex];
          const order = item.products;
          vm.singleOrder.push({
            order,
            id,
            is_paid: item.is_paid,
            create_at: item.create_at,
            num: item.num,
            total: item.total,
            user: item.user
          });
        });
        vm.orderTotal = vm.singleOrder.reduce((a, b) => {
          return a + b.total
        }, 0);
      });
    },
  }

</script>

<style>
  .ordercontainer {
    margin-top: 100px;
  }

  .order {
    padding: 20px
  }

  #form {
    text-align: center;
    position: relative;
    margin-top: 20px;
    width: 100%;
  }

  .finish {
    text-align: center
  }

  .previous-step,
  .next-step {
    width: 100px;
    font-weight: bold;
    color: white;
    border: 0 none;
    border-radius: 0px;
    cursor: pointer;
    padding: 10px 5px;
    margin: 10px 5px 10px 0px;
    float: right
  }

  .previous-step {
    background: #616161;
  }

  .next-step {
    background: rgb(102, 204, 255);
  }

  .text {
    color: #2F8D46;
    font-weight: normal
  }

  #progressbar {
    margin-bottom: 30px;
    overflow: hidden;
    color: lightgrey
  }

  #progressbar .active {
    color: rgb(102, 204, 255)
  }

  #progressbar li {
    list-style-type: none;
    font-size: 15px;
    width: 20%;
    position: relative;
    font-weight: 400;
    text-align: center;
  }

  #progressbar #step1:before {
    content: "1"
  }

  #progressbar #step2:before {
    content: "2"
  }

  #progressbar #step3:before {
    content: "3";
  }

  #progressbar li:before {
    width: 50px;
    height: 50px;
    line-height: 45px;
    display: block;
    font-size: 20px;
    color: #ffffff;
    background: lightgray;
    border-radius: 50%;
    margin: 0 auto 10px auto;
    padding: 2px;
    text-align: center;
  }

  #progressbar #step2:after {
    content: '';
    width: 475px;
    height: 2px;
    background: var(--Bgc2);
    position: absolute;
    top: 25px;
    left: 120px;
    z-index: -1
  }

  #progressbar #step1:after {
    content: '';
    width: 475px;
    height: 2px;
    background: var(--Bgc1);
    position: absolute;
    top: 25px;
    left: 120px;
    z-index: -1
  }

  #progressbar li.active:before,
  #progressbar li.active:after {
    background: rgb(102, 204, 255)
  }

  .progress {
    height: 20px
  }

  .progress-bar {
    background-color: #2F8D46
  }

  .formWrap {
    margin-left: auto;
    margin-right: auto;
  }

  .form-group {
    text-align: left
  }

  .orderImg {
    background-image: url('https://images.unsplash.com/photo-1505069190533-da1c9af13346?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2134&q=80');
    height: 410px;
    background-position: 0 56%;
    background-size: cover;
  }

  td div[style] {
    background-size: cover;
    background-position: center;
  }

  .orderTbody {
    display: block;
    overflow-y: auto;
    width: 840px;
    max-height: 490px;
  }

  .orderThead {
    display: block;
  }

  .orderTfoot {
    display: block;
  }

  .orderTfoot td:first-child {
    width: 741px;
  }

  .orderTfoot td:last-child {
    width: 100px;
  }

  .ld .ld-bounce-in {
    animation-iteration-count: infinite;
  }

  .orderContent {
    font-size: 20px;
  }

  .orderTr td {
    border-top: none;
    border-bottom: 1px solid #dee2e6;
    text-align: center;
    padding-bottom: 20px;
    font-size: 20px;
  }

  .orderImg2 {
    height: 150px;
    width: 200px;
    margin: 0 auto;
  }

  .accordion h2 button {
    color: rgb(102, 204, 255, 0.8);
    margin: 10px
  }

  .accordion h2 button:hover {
    color: rgb(102, 204, 255, 1);
  }

  .noCart {
    flex-direction: column;
    align-items: center;
  }

  .noCart p {
    color: lightgrey;
    font-size: 20px
  }

  .stepContent2 .col-4 th,
  .stepContent2 .col-4 td {
    padding: 0.7rem
  }

  .accordion button:focus {
    box-shadow: none
  }

  .accordion:last-child {
    border-bottom: 1px solid rgba(0,0,0,0.125);
  }

  .stepContent3 {
    text-align: center;
  }

  .stepContent3 span {
    color: lawngreen;
    font-size: 200px
  }

  .stepContent3 p {
    color: lightgrey;
  }

  .orderTotal {
    text-align: right;
    padding: 10px
  }
  .orderTotal span:first-child{
    margin-right:30px
  }
</style>
