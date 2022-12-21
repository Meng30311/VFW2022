<template>
  <div>
    <loading :active.sync="isLoading">
      <img src="@/assets/img/loading.png" class="ld ld-dim" width="400">
    </loading>
    <ProductHeader></ProductHeader>
    <div class="container mt-5 mb-3 cardContainer">
      <h5>推薦景點與住宿資訊</h5>
      <hr height="2">
      <div class="carousel slide" data-ride="carousel" id="carouselExampleControls">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="row mt-4">
              <div class="col-md-4">
                <div class="card">
                  <img class="card-img-top" ref="tokyosrc1"
                    src="https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/00/a0000119/img/basic/a0000119_main.jpg?20200616190703&q=80&rw=750&rh=536">
                  <div class="card-body">
                    <h4 class="card-title">
                      <span class="icon"><i class="fas fa-map-marker-alt"></i></span>
                      <span class="ml-2" ref="tokyotitle1">新宿車站周邊百貨公司</span>
                    </h4>
                    <p class="card-text" ref="tokyotext1">大葉高島屋、伊勢丹等百貨與H&M等店面林立，也有24H營業的松本清等藥妝店。</p>
                    <a href="#modal" data-toggle="modal" class="btn btn-outline-primary"
                      @click="modalInfo(id=0)">詳細介紹</a>
                  </div>
                </div>
              </div>
              <Card v-for="item in products" v-if="item.category === '東京新宿'" 
                    :key="item.title" :item="item"></Card>
            </div>
            <div class="row mt-4">
              <div class="col-md-4">
                <div class="card">
                  <img class="card-img-top" ref="tokyosrc2"
                    src="https://img.travel98.com/xl/P_32963_73ccf6e22677a96757738ee69e18e2ff_o.jpg">
                  <div class="card-body">
                    <h4 class="card-title">
                      <span class="icon"><i class="fas fa-map-marker-alt"></i></span>
                      <span class="ml-2" ref="tokyotitle2">明治神宮</span>
                    </h4>
                    <p class="card-text" ref="tokyotext2">明治神宮位置鬧中取靜，是日本神道信仰重要地標，擁有日本最大木製鳥居。</p>
                    <a href="#modal" data-toggle="modal" class="btn btn-outline-primary"
                      @click="modalInfo(id=1)">詳細介紹</a>
                  </div>
                </div>
              </div>
              <Card v-for="item in products" v-if="item.category === '明治神宮'" 
                    :key="item.title" :item="item"></Card>
            </div>
          </div>
          <div class="carousel-item">
            <div class="row mt-4">
              <div class="col-md-4">
                <div class="card">
                  <img class="card-img-top" ref="tokyosrc3"
                    src="https://www.bring-you.info/wp-content/uploads/2019/05/senso-ji-2.jpg">
                  <div class="card-body">
                    <h4 class="card-title">
                      <span class="icon"><i class="fas fa-map-marker-alt"></i></span>
                      <span class="ml-2" ref="tokyotitle3">淺草寺</span>
                    </h4>
                    <p class="card-text" ref="tokyotext3">淺草寺是東京都內最古老的寺廟，表參道可以一次買齊各式特色東京伴手禮，是最富日式風味的東京景點。</p>
                    <a href="#modal" data-toggle="modal" class="btn btn-outline-primary"
                      @click="modalInfo(id=2)">詳細介紹</a>
                  </div>
                </div>
              </div>
              <Card v-for="item in products" v-if="item.category === '淺草寺'" 
                    :key="item.title" :item="item"></Card>
            </div>
            <div class="row mt-4">
              <div class="col-md-4">
                <div class="card">
                  <img class="card-img-top" ref="tokyosrc4"
                    src="https://1.bp.blogspot.com/-VCOcsAXbXMg/XVv5hHtcTCI/AAAAAAAEHN8/2WB3IbcFhCkzQc1PNTJjFSFZphrHoFjuQCLcBGAs/s1600/DSC02955-2.jpg">
                  <div class="card-body">
                    <h4 class="card-title">
                      <span class="icon"><i class="fas fa-map-marker-alt"></i></span>
                      <span class="ml-2" ref="tokyotitle4">東京迪士尼樂園</span>
                    </h4>
                    <p class="card-text" ref="tokyotext4">東京迪士尼是美國國外首座迪士尼樂園，更是全球唯一一座有海洋主題的迪士尼園區!</p>
                    <a href="#modal" data-toggle="modal" class="btn btn-outline-primary"
                      @click="modalInfo(id=3)">詳細介紹</a>
                  </div>
                </div>
              </div>
              <Card v-for="item in products" v-if="item.category === '迪士尼'" 
                    :key="item.title" :item="item"></Card>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true">
            <i class="fas fa-angle-left"></i>
          </span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true">
            <i class="fas fa-angle-right"></i>
          </span>
          <span class="sr-only">Next</span>
        </a>
      </div>
      <Browsed/>
      <Favrite/>
    </div>
    <Footer/>
    <Modal />
    <Alert />
  </div>
</template>

<script>
  import Modal from '@/components/Modal'
  import Alert from '@/components/Alert'
  import Footer from '@/components/Footer'
  import ProductHeader from '@/components/ProductHeader'
  import Browsed from '@/components/Browsed'
  import Favrite from '@/components/Favrite'
  import Card from '@/components/Card'
  import $ from 'jquery'

  export default {
    components: {
      Modal,
      Alert,
      Footer,
      ProductHeader,
      Browsed,
      Favrite,
      Card,
    },
    data() {
      return {
        modal: {
          title: [],
          src: [],
          text: [],
        },
        emitInfo: {
          modalSrc: '',
          modalTitle: '',
          modalText: '',
        },
        ref: {},
        products: {},
        singleProduct: {
          origin_price: '',
          price: '',
          id: '',
          qty: 1,
        },
        isLoading: false,
        loadingStatus: {
          modalLoading: false,
          loadingItem: '',
          isCart: false,
        },
        cart: {},
        localStorageItem:[],
      }
    },
    methods: {
      modalInfo(id) {
        const vm = this;
        this.modal.src.push(vm.ref.tokyosrc1.src, vm.ref.tokyosrc2.src, vm.ref.tokyosrc3.src,vm.ref.tokyosrc4.src);
        this.modal.title.push(vm.ref.tokyotitle1.innerHTML, vm.ref.tokyotitle2.innerHTML,vm.ref.tokyotitle3.innerHTML,vm.ref.tokyotitle4.innerHTML);
        this.modal.text.push(vm.ref.tokyotext1.innerHTML, vm.ref.tokyotext2.innerHTML,vm.ref.tokyotext3.innerHTML,vm.ref.tokyotext4.innerHTML);
        
        this.emitInfo.modalSrc = vm.modal.src[id];
        this.emitInfo.modalText = vm.modal.text[id];
        this.emitInfo.modalTitle = vm.modal.title[id];
        this.$bus.$emit('modalinfo', vm.emitInfo,vm.singleProduct);
      },
      getProducts() {
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
        const vm = this;
        this.isLoading = true;
        this.$http.get(api).then(response => {
          vm.products = response.data.products;
          vm.isLoading = false;
        });
      },
      getSingle(id) {
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
        const vm = this;
        
        this.$http.get(api).then(response => {
          vm.emitInfo.modalSrc = response.data.product.imageUrl;
          vm.emitInfo.modalText = response.data.product.description;
          vm.emitInfo.modalTitle = response.data.product.title;
          vm.singleProduct.origin_price = response.data.product.origin_price;
          vm.singleProduct.price = response.data.product.price;
          vm.singleProduct.id = response.data.product.id;
          vm.$bus.$emit('modalinfo', vm.emitInfo, vm.singleProduct, true);
          vm.$bus.$emit('stopLoading');
          $('#modal').modal('show');
          

          let pushItem={
            title:'',
            src:'',
            city:'',
            isFav:false,
          };
          pushItem.title=response.data.product.title;
          pushItem.src=response.data.product.imageUrl;
          pushItem.city=response.data.product.category;
          let ifRepeat=vm.localStorageItem.some(item =>{return item.title == pushItem.title});
          if(ifRepeat){
            return
          };
          if(vm.localStorageItem.length == 4){
            vm.localStorageItem.splice(0,1);
          }; 
          vm.localStorageItem.push(pushItem);
          localStorage.setItem('最近瀏覽',JSON.stringify(vm.localStorageItem));
          vm.$bus.$emit('updateStorage');
        });
      },
      addCart(id, qty = 1) {
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        const vm = this;
        const cart = {
          product_id: id,
          qty,
        };
        this.$http.post(api, {
          data: cart
        }).then(response => {
          vm.$bus.$emit('loadingOver', false);
          vm.$bus.$emit('stopLoading');
          $('#modal').modal('hide');
          vm.getCart();
          vm.$bus.$emit('message:push', '新增成功', 'success');
        });
      },
      getCart() {
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        const vm = this;
        this.$http.get(api).then(response => {
          vm.isLoading = false;
          vm.cart = response.data.data;
          vm.$bus.$emit('getCartInfo', vm.cart);
        });
      },
    },
    created() {
      const vm = this;
      this.getProducts();
      this.getCart();
      this.$bus.$on('getModalCart', (id, qty = 1) => {
        vm.addCart(id, qty)
      });
      vm.localStorageItem=JSON.parse(localStorage.getItem('最近瀏覽')) || [];
      this.$bus.$on('getSingle', id => {
        vm.getSingle(id)
      });
      this.$bus.$on('addCart', (id,qty) => {
        vm.addCart(id,qty)
      });
    },
    mounted() {
      const vm = this;
      this.ref = vm.$refs;
      $('#carouselExampleControls').carousel('pause');
      this.$bus.$emit('getHeader','東京自由行｜東京旅遊景點','東京旅遊景點及住宿','https://gsimg.asiayo.com/ay-image-upload/1555493119697_1.tokyotower.jpg');
    },
  }

</script>

<style scoped lang="scss">
@import "../assets/helpers/card";
 
</style>
