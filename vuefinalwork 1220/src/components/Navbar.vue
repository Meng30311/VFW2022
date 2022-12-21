<template>
  <div id="top">
    <div class="modal fade" id="loginModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">登入</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="loginIcons">
              <a class="btn btn-dark btn-social mx-3 twitter" href="#!"><i class="fab fa-twitter"></i></a>
              <a class="btn btn-dark btn-social mx-3 facebook" href="#!"><i class="fab fa-facebook-f"></i></a>
              <a class="btn btn-dark btn-social mx-3 linkedin" href="#!"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <div class="loginInfo">
              <input type="email" placeholder="Email" v-model="user.username">
              <input type="password" placeholder="Password" v-model="user.password">
            </div>
            <div class="loginBtn">
              <button @click="login()">確定</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
      <div class="container">
        <router-link class="navbar-brand js-scroll-trigger logo" title="Japan Travel" to="/"><h1>Japan Travel</h1></router-link>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
          data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
          aria-label="Toggle navigation">       
          <i class="fas fa-bars ml-1"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav text-uppercase ml-auto">
            <li class="nav-item">
              <router-link class="nav-link js-scroll-trigger" to="/products">商品列表</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link js-scroll-trigger" to="/customerorder">我的訂單</router-link>
            </li>
            <li class="nav-item" v-if="!isLogin">
              <a href="#" class="nav-link" data-toggle="modal" data-target="#loginModal">登入</a>
            </li>
            <li class="nav-item" v-if="isLogin">
              <a href="#" class="nav-link" @click.prevent="logout">登出</a>
            </li>
            <li class="nav-item">
              <router-link href="#" class="nav-link" to="/admin">後台管理</router-link>
            </li>
            <li class="nav-item">
               <a class="nav-link js-scroll-trigger" role="button" data-toggle="dropdown" 
                 href="#" @click="toggleDrop">
                <span class="fa-1x position-relative">
                  <i class="fas fa-cart-plus"></i>
                  <span class="badge badge-pill badge-danger">{{cart.carts.length}}</span>
                </span>
               </a>
               <div class="dropdown-menu">
                <div class="CartContainer">
                   <div class="Header">
   	   	             <h3 class="Heading">Shopping Cart</h3>
   	               </div>
                   <div class="Cart-Items" v-for="item in cart.carts" :key="item.id">
                     <div class="del">
                       <a href="#" @click.prevent="delCart(item.id)">
                            <i class="far fa-trash-alt"></i>
                       </a>
                     </div>
                     <div class="image-box" :style="`backgroundImage:url(${item.product.imageUrl})`">
   	   	             </div>
                     <div class="about">
                       <h1 class="title">{{item.product.title}}</h1>
                     </div>
                     <div class="counter"> 	   	  	           
   	   	  	           <div class="count">{{item.qty}}晚</div> 	   	  	           
   	   	             </div>
                     <div class="prices">{{item.total}}</div>
                   </div>
                   <hr>
                   <div class="checkout">
                     <div class="total">
                       <div>
   	 		                 <div class="Subtotal">Sub-Total</div>
   	 	                 </div>
                       <div class="total-amount">{{cart.final_total}}</div>
                     </div>
                     <button class="button">Checkout</button>
                   </div>
                </div>
               </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <Alert />
  </div>
</template>

<script>
  import Alert from '@/components/Alert'
  import $ from 'jquery'

  export default {
    components: {
      Alert,
    },
    data() {
      return {
        cart: {
          carts:{}
        },
        user:{
          username:'',
          password:''
        },
        isLogin:false,
        path:'',
      }
    },
    methods: {
      getCart(){
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        const vm = this;
        this.$http.get(api).then(response => {
          vm.cart = response.data.data;
          vm.$bus.$emit('getCart');
          console.log(vm.cart);
        });
      },
      delCart(id) {
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
        const vm = this;
        this.$http.delete(api).then(response => {
          if (response.data.success) {
            vm.getCart();
            vm.$bus.$emit('message:push', '刪除成功', 'danger');
          };
        });
        $('.dropdown-toggle').dropdown("hide");
      },
      login() {
        const api = `${process.env.APIPATH}/admin/signin`;
        const vm=this;
        this.$http.post(api,vm.user).then(response => {
          console.log(response);
          if (response.data.success) {
            $('#loginModal').modal('hide');
            vm.$bus.$emit('message:push', '登入成功', 'success');
            vm.isLogin=true;
          }else{
            alert('登入失敗');
            $('#loginModal').modal('hide');
          };
        });
      },
      logout(){
        const api = `${process.env.APIPATH}/logout`;
        const vm=this;
        this.$http.post(api).then(response => {
          alert('已登出');
          vm.isLogin=false;
        });
      },
      toggleDrop(){
        $('.dropdown-menu').on('click',function(event){
          event.stopPropagation();
        });
      },
      addcart(id,qty=1){
        const vm=this; 
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        const cart = {
          product_id: id,
          qty,
        };
        this.$http.post(api, {data: cart}).then(response => {
          vm.getCart();
        });
        console.log(id)
      },
    },
    created(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/user/check`;
      this.$http.post(api).then(response =>{
        if(response.data.success){
          vm.isLogin=true;
        }
      });
      this.getCart();
      vm.$bus.$on('getCartInfo', () => {
        vm.getCart();
      });
      vm.$bus.$on('isLogin', isLogin => {
        vm.isLogin=isLogin;
      });
      vm.$bus.$on('getpath', next => {
        vm.path=next;
        console.log(vm.path)
      });
    },
    mounted() {
      document.addEventListener('scroll', function () {
        if ($("#mainNav").offset().top > 100) {
          $("#mainNav").addClass("navbar-shrink");
        } else {
          $("#mainNav").removeClass("navbar-shrink");
        };
      });
    },
  }

</script>

<style scoped lang="scss">
@import "../assets/helpers/shoppingCart";
  .badge {
    font-size: 5px;
    position: absolute;
    bottom: -2px;
    right: -8px
  }

  .dropdown-toggle::after {
    display: none;
  }

  .dropdown-menu {
    min-width: 1000px;
    z-index: 9999;
    left: auto;
    right:400px;
    top:auto;
    margin:0;
    padding:0;
    border:none;
    background-clip:content-box;
    height:auto;
  }

  td a {
    font-size: 18px
  }

  .container {
    width: 1340px;
  }
  .modal-content{
    width:100%;
  }
  .modal-header{
    justify-content:center;
    border-bottom:0;
  }
  .modal-header h5{
    margin-left:209px;
  }
  .modal-title{
    font-size:25px;
    font-weight:bold;
  }
  .twitter{
      background-color:rgb(29, 161, 242);
      border-color:rgb(29 ,161, 242);
  }
  .facebook{
      background-color:rgb(66,102,179);
      border-color:rgb(66,102,179);
  }
  .linkedin{
      background-color:rgb(14,118,168);
      border-color:rgb(14,118,168);
  }
  .loginIcons{
    display:flex;
    justify-content:center;
  }
  .loginInfo{
    margin-top:20px;
    display:flex;
    flex-direction:column;
    align-items:center;
  }
  .loginInfo input{
    width:75%;
    padding:12px 15px;
    background-color:#eee;
    border:none;
    margin:8px 0;
    border-radius:10px;
  }
  .loginBtn{
    display:flex;
    justify-content:center;
    margin-top:10px;
  }
  .loginBtn button{
    border-radius:20px;
    border:1px solid #ff4b2b;
    background-color:#ff4b2b;
    color:white;
    font-size:16px;
    font-weight:bold;
    padding:12px 40px;
    letter-spacing:1px;
  }
  #mainNav .navbar-toggler{
    border:1px solid;
    background-color:inherit;
  }
  .logo h1{
    text-indent:101%;
    overflow:hidden;
    white-space:nowrap;
  }
  
</style>
