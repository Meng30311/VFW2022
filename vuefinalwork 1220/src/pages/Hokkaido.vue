<template>
  <div>
    <loading :active.sync="isLoading">
      <img src="@/assets/img/loading.png" class="ld ld-dim" width="400">
    </loading>
    <ProductHeader></ProductHeader>
    <div class="container mt-5 mb-3">
      <h5>推薦景點</h5>
      <hr height="2">
      <div class="carousel slide" id="carouselExampleControls" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="row mt-4">
              <div class="col-md-4">
                <div class="card">
                  <div class="card-img-top">
                    <img src="https://resources.matcha-jp.com/resize/720x2000/2018/10/18-64850.jpeg" class="card-img-top" ref="hoksrc1">
                  </div>
                  <div class="card-body">
                    <h4 class="card-title">
                      <span class="icon"><i class="fas fa-map-marker-alt"></i></span>
                      <span class="ml-2" ref="hoktitle1">函館山</span>
                    </h4>
                    <p class="card-text" ref="hoktext1">函館山夜景可遠眺整個函館市及港口，有「世界三大夜景」之美稱。</p>
                    <a href="#modal" data-toggle="modal" class="btn btn-outline-primary" @click="modalInfo(id=0)">詳細介紹</a>
                  </div>
                </div>
              </div>
              <div class="col-md-4" v-for="item in products" v-if="item.category === '函館'" :key="item.id">
                <div class="card">
                  <div class="card-img-top"
                   :style="{backgroundImage:`url(${item.imageUrl})`}">
                  </div>
                  <div class="card-body">
                    <h4 class="card-title">
                      <span class="icon"><i class="fas fa-bed"></i></span>
                      <span class="ml-2">{{item.title}}</span>
                    </h4>
                    <p class="card-text">{{item.description}}</p>
                    <div class="d-flex justify-content-between">
                      <a href="#" class="btn btn-outline-primary" @click.prevent="getSingle(item.id)">
                        <template v-if="loadingStatus.modalLoading & loadingStatus.loadingItem === item.id">
                          <span class="mr-2">
                            <i class="fas fa-spinner fa-spin"></i>
                          </span>
                        </template>
                        <template v-else>
                          <span class="mr-2"><i class="fas fa-search-plus"></i></span>
                        </template> 查看更多
                      </a>
                      <a href="#" class="btn btn-outline-primary" @click.prevent="addCart(item.id)">
                        <template v-if="loadingStatus.isCart & loadingStatus.loadingItem === item.id">
                          <span class="mr-2">
                            <i class="fas fa-spinner fa-spin"></i>
                          </span>
                        </template>
                        <template v-else>
                          <span class="mr-2"><i class="fas fa-cart-plus"></i></span>
                        </template> 加入購物車
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-md-4">
                <div class="card">
                  <div class="card-img-top">
                    <img src="https://cdn.zekkei-japan.jp/images/spots/e17f829dda4b1df988aff8e429a66fdf.jpg" class="card-img-top" ref="hoksrc2">
                  </div>
                  <div class="card-body">
                    <h4 class="card-title">
                      <span class="icon"><i class="fas fa-map-marker-alt"></i></span>
                      <span class="ml-2" ref="hoktitle2">小樽運河</span>
                    </h4>
                    <p class="card-text" ref="hoktext2">小樽運河沿岸排列著一排紅磚倉庫，是小樽市作為日本北海道金融、經濟中心的象徵。</p>
                    <a href="#modal" data-toggle="modal" class="btn btn-outline-primary" @click="modalInfo(id=1)">詳細介紹</a>
                  </div>
                </div>
              </div>
              <div class="col-md-4" v-for="item in products" v-if="item.category === '運河'" :key="item.id">
                <div class="card">
                  <div class="card-img-top"
                    :style="{backgroundImage:`url(${item.imageUrl})`}">
                  </div>
                  <div class="card-body">
                    <h4 class="card-title">
                      <span class="icon"><i class="fas fa-bed"></i></span>
                      <span class="ml-2">{{item.title}}</span>
                    </h4>
                    <p class="card-text">{{item.description}}</p>
                    <div class="d-flex justify-content-between">
                      <a href="#" class="btn btn-outline-primary" @click.prevent="getSingle(item.id)">
                        <template v-if="loadingStatus.modalLoading & loadingStatus.loadingItem === item.id">
                          <span class="mr-2">
                            <i class="fas fa-spinner fa-spin"></i>
                          </span>
                        </template>
                        <template v-else>
                          <span class="mr-2"><i class="fas fa-search-plus"></i></span>
                        </template> 查看更多
                      </a>
                      <a href="#" class="btn btn-outline-primary" @click.prevent="addCart(item.id)">
                        <template v-if="loadingStatus.isCart & loadingStatus.loadingItem === item.id">
                          <span class="mr-2">
                            <i class="fas fa-spinner fa-spin"></i>
                          </span>
                        </template>
                        <template v-else>
                          <span class="mr-2"><i class="fas fa-cart-plus"></i></span>
                        </template> 加入購物車
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="row mt-4">
              <div class="col-md-4">
                <div class="card">
                  <div class="card-img-top">
                    <img src="https://d27h7u7rtwbie8.cloudfront.net/2019/05/bIMG_2410.jpg" class="card-img-top" ref="hoksrc3">
                  </div>
                  <div class="card-body">
                    <h4 class="card-title">
                      <span class="icon"><i class="fas fa-map-marker-alt"></i></span>
                      <span class="ml-2" ref="hoktitle3">狸小路</span>
                    </h4>
                    <p class="card-text" ref="hoktext3">狸小路有各種商品專門店、食肆以及土產專賣店，更有許多街頭表演者在狸小路進行各種表演！</p>
                    <a href="#modal" data-toggle="modal" class="btn btn-outline-primary" @click="modalInfo(id=2)">詳細介紹</a>
                  </div>
                </div>
              </div>
              <div class="col-md-4" v-for="item in products" v-if="item.category === '運河'" :key="item.id">
                <div class="card">
                  <div class="card-img-top"
                    :style="{backgroundImage:`url(${item.imageUrl})`}">
                  </div>
                  <div class="card-body">
                    <h4 class="card-title">
                      <span class="icon"><i class="fas fa-bed"></i></span>
                      <span class="ml-2">{{item.title}}</span>
                    </h4>
                    <p class="card-text">{{item.description}}</p>
                    <div class="d-flex justify-content-between">
                      <a href="#" class="btn btn-outline-primary" @click.prevent="getSingle(item.id)">
                        <template v-if="loadingStatus.modalLoading & loadingStatus.loadingItem === item.id">
                          <span class="mr-2">
                            <i class="fas fa-spinner fa-spin"></i>
                          </span>
                        </template>
                        <template v-else>
                          <span class="mr-2"><i class="fas fa-search-plus"></i>
                          </span>
                        </template> 查看更多
                      </a>
                      <a href="#" class="btn btn-outline-primary" @click.prevent="addCart(item.id)">
                        <template v-if="loadingStatus.isCart & loadingStatus.loadingItem === item.id">
                          <span class="mr-2">
                            <i class="fas fa-spinner fa-spin"></i>
                          </span>
                        </template>
                        <template v-else>
                          <span class="mr-2"><i class="fas fa-cart-plus"></i>
                          </span>
                        </template> 加入購物車
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-md-4">
                <div class="card">
                  <div class="card-img-top">
                    <img src="https://wp-odai.wamazing.com/media/wp-content/uploads/sites/2/2019/11/hokkaidoushirine_9.jpg" class="card-img-top" ref="hoksrc4">
                  </div>
                  <div class="card-body">
                    <h4 class="card-title">
                      <span class="icon"><i class="fas fa-map-marker-alt"></i></span>
                      <span class="ml-2" ref="hoktitle4">北海道神宮</span>
                    </h4>
                    <p class="card-text" ref="hoktext4">北海道神宮祀奉守護北海道開拓事業的三大神明，日本後來更承認北海道神宮是社格最高的神社。</p>
                    <a href="#modal" data-toggle="modal" class="btn btn-outline-primary" @click="modalInfo(id=3)">詳細介紹</a>
                  </div>
                </div>
              </div>
              <div class="col-md-4" v-for="item in products" v-if="item.category === '神宮'" :key="item.id">
                <div class="card">
                  <div class="card-img-top"
                    :style="{backgroundImage:`url(${item.imageUrl})`}">
                  </div>
                  <div class="card-body">
                    <h4 class="card-title">
                      <span class="icon"><i class="fas fa-bed"></i></span>
                      <span class="ml-2">{{item.title}}</span>
                    </h4>
                    <p class="card-text">{{item.description}}</p>
                    <div class="d-flex justify-content-between">
                      <a href="#" class="btn btn-outline-primary" @click.prevent="getSingle(item.id)">
                        <template v-if="loadingStatus.modalLoading & loadingStatus.loadingItem === item.id">
                          <span class="mr-2">
                            <i class="fas fa-spinner fa-spin"></i>
                          </span>
                        </template>
                        <template v-else>
                          <span class="mr-2"><i class="fas fa-search-plus"></i></span>
                        </template> 查看更多
                      </a>
                      <a href="#" class="btn btn-outline-primary"  @click.prevent="addCart(item.id)">
                        <template v-if="loadingStatus.isCart & loadingStatus.loadingItem === item.id">
                          <span class="mr-2">
                            <i class="fas fa-spinner fa-spin"></i>
                          </span>
                        </template>
                        <template v-else>
                          <span class="mr-2"><i class="fas fa-cart-plus"></i></span>
                        </template> 加入購物車
                      </a>
                    </div>
                  </div>
                </div>
              </div>
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
    </div>
    <Footer/>
    <Modal/>
    <Alert/>
  </div>
</template>

<script>
  import Modal from '@/components/Modal'
  import Alert from '@/components/Alert'
  import Footer from '@/components/Footer'
  import ProductHeader from '@/components/ProductHeader'
  import Browsed from '@/components/Browsed'
  import $ from 'jquery'

  export default {
    components: {
      Modal,
      Alert,
      Footer,
      ProductHeader,
      Browsed,
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
        singleProduct:{
          origin_price:'',
          price:'',
          id:'',
          qty:1,
        },
        loadingStatus:{
         loadingItem:'',
         modalLoading:false,
         isCart:false,
        },
        products:{},
        ref: {},
        isLoading:false,
        cart:{},
        localStorageItem:[],
      }
    },
    methods:{
       modalInfo(id){
       const vm=this;
       this.modal.src=[vm.ref.hoksrc1.src,vm.ref.hoksrc2.src,vm.ref.hoksrc3.src,vm.ref.hoksrc4.src];
       this.modal.title=[vm.ref.hoktitle1.innerHTML,vm.ref.hoktitle2.innerHTML,vm.ref.hoktitle3.innerHTML,vm.ref.hoktitle4.innerHTML];
       this.modal.text=[vm.ref.hoktext1.innerHTML,vm.ref.hoktext2.innerHTML,vm.ref.hoktext3.innerHTML,vm.ref.hoktext4.innerHTML];
       
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
        this.loadingStatus.loadingItem = id;
        this.loadingStatus.modalLoading = true;
        this.$http.get(api).then(response => {
          vm.emitInfo.modalSrc = response.data.product.imageUrl;
          vm.emitInfo.modalText = response.data.product.description;
          vm.emitInfo.modalTitle = response.data.product.title;
          vm.singleProduct.origin_price = response.data.product.origin_price;
          vm.singleProduct.price = response.data.product.price;
          vm.singleProduct.id = response.data.product.id;
          vm.$bus.$emit('modalinfo', vm.emitInfo, vm.singleProduct, true);
          vm.loadingStatus.modalLoading = false;
          $('#modal').modal('show');
          vm.loadingStatus.loadingItem = '';
          console.log(response.data);
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
        this.loadingStatus.loadingItem = id;
        this.loadingStatus.isCart = true;
        this.$http.post(api, {
          data: cart
        }).then(response => {
          vm.$bus.$emit('loadingOver', false);
          vm.loadingStatus.loadingItem = '';
          vm.loadingStatus.isCart = false;
          $('#modal').modal('hide');
          vm.getCart();
          vm.$bus.$emit('message:push', '新增成功', 'success');
        });
       },
       getCart(){
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        const vm = this;
        this.$http.get(api).then(response => {
          vm.isLoading = false;
          vm.cart = response.data.data;
          vm.$bus.$emit('getCartInfo', vm.cart);
        });
       },
    },
    created(){
     const vm=this;
     this.getProducts();
     vm.localStorageItem=JSON.parse(localStorage.getItem('最近瀏覽')) || [];
    },
    mounted(){
     const vm = this;
     this.ref = vm.$refs;
     $('#carouselExampleControls').carousel('pause');
     this.$bus.$emit('getHeader','北海道自由行｜北海道旅遊景點','北海道旅遊景點及住宿','https://gsimg.asiayo.com/ay-image-upload/1513054072392_1492747528904_Hokkaido_City_Banner_Jimmy.jpg');
   },
  }

</script>

<style scoped lang="scss">
  @import "../assets/helpers/card";
</style>
