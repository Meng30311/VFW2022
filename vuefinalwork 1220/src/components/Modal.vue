<template>
  <div>
    <div class="portfolio-modal modal fade" id="modal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="close-modal" data-dismiss="modal"><img src="@/assets/img/close-icon.svg" alt="Close modal" />
          </div>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-8">
                <div class="h-100 mt-3">
                  <div class="modal-body">
                    <!-- Project Details Go Here-->
                    <h2 class="text-uppercase">{{modal.modalTitle}}</h2>
                    <img class="img-fluid d-block mx-auto" :src="modal.modalSrc" alt="">
                    <p>{{modal.modalText}}</p>
                    <div class="my-3 landmark-wrap" v-if="isHotel">
                      <h5 class="text-left mt-2">附近地標</h5>
                      <div class="d-flex justify-content-between landmark mt-2 mb-2">
                        <div class="w-25">
                          <span><i class="far fa-map"></i></span>
                          <p>距離 {{landmark[0].landmark}} 約<br>{{landmark[0].kilo}}公里</p>
                        </div>
                        <div class="w-25">
                          <span><i class="far fa-map"></i></span>
                          <p>距離 {{landmark[1].landmark}} 約<br>{{landmark[1].kilo}}公里</p>
                        </div>
                        <div class="w-25">
                          <span><i class="fas fa-subway"></i></span>
                          <p>距離 {{landmark[2].landmark}} 約<br>{{landmark[2].kilo}}公里</p>
                        </div>
                        <div class="w-25">
                          <span><i class="fas fa-subway"></i></span>
                          <p>距離 {{landmark[3].landmark}} 約<br>{{landmark[3].kilo}}公里</p>
                        </div>
                      </div>
                    </div>
                    <div class="w-100 d-flex justify-content-between align-items-center" v-if="isHotel">
                      <del class="h5">原價 {{product.origin_price}} 元</del>
                      <div class="h5">現在只要{{product.price}} 元</div>
                    </div>
                    <div class="w-100 my-3" v-if="isHotel">
                      <select aria-label="Default select example" class="custom-select custom-select-sm"
                        v-model="product.qty">
                        <option v-for="num in 5" :value="num" :key="num">選購{{num}}晚</option>
                      </select>
                    </div>
                    <p>
                      <button class="btn btn-primary" data-toggle="collapse" data-target="#collapseMap"
                        aria-expanded="false" aria-controls="collapseExample">
                        展開地圖
                      </button>
                    </p>
                    <div class="w-100 my-3 collapse" id="collapseMap">
                      <div class="card card-body">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.4360152552895!2d139.7026934155511!3d35.690886637049125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188cdb5e314123%3A0x3ac7b6160a51a476!2z5paw5a6_5LiJ5LiB55uu!5e0!3m2!1szh-TW!2stw!4v1615258289414!5m2!1szh-TW!2stw"
                          height="250" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                      </div>
                    </div>
                    <div class="mt-3 d-flex justify-content-end" v-if="isHotel">
                      <a href="#" class="btn btn-outline-primary" @click.prevent="addCart()">
                        <template v-if="cartLoading">
                          <span class="mr-2">
                            <i class="fas fa-spinner fa-spin"></i>
                          </span>
                        </template>
                        <template v-else>
                          <span class="mr-2">
                            <i class="fas fa-cart-plus"></i>
                          </span>
                        </template>
                        加入購物車
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    data() {
      return {
        modal: {
          modalSrc: '',
          modalTitle: '',
          modalText: '',
        },
        isHotel: false,
        product: {
          origin_price: '',
          price: '',
          id: '',
          qty: 0,
        },
        landmark:[{landmark:"",kilo:0},{landmark:"",kilo:0},{landmark:"",kilo:0},{landmark:"",kilo:0}],
        landmarks:{
          餅屋M:[{landmark:"大久保車站",kilo:0.24},{landmark:"歌舞伎町",kilo:1.04},{landmark:"JR 大久保站",kilo:0.33},{landmark:"JR 新大久保站",kilo:0.35}],
          元氣旅居: [{landmark:"花園神社",kilo:0.97},{landmark:"伊勢丹 新宿店",kilo:0.3},{landmark:"東京地下鐵 新宿三丁目站 ",kilo:0.38},{landmark:"都營 新宿三丁目站",kilo:0.38}],
          千易西早稻田站:[{landmark:"東新宿車站",kilo:0.63},{landmark:"大久保車站",kilo:0.89},{landmark:"東京地下鐵 西早稻田站",kilo:0.56},{landmark:"JR 新大久保站",kilo:0.61}],
          鳶尾花旅居:[{landmark:"澀谷中央街",kilo:0.15},{landmark:"忠犬八公",kilo:0.43},{landmark:"京王 神泉站",kilo:0.27},{landmark:"東京地下鐵 澀谷站",kilo:0.45}],
          晴空墨邸淺草線:[{landmark:"東京晴空塔",kilo:0.52},{landmark:"隅田川公園",kilo:0.72},{landmark:"東武 押上站",kilo:0.49},{landmark:"京成 押上站",kilo:0.49}],
          上野日和:[{landmark:"東京都美術館",kilo:1.1},{landmark:"諏方神社",kilo:1.24},{landmark:"JR 鶯谷站",kilo:0.59},{landmark:"JR 鶯谷站",kilo:0.6}],
          難波南旅居:[{landmark:"天王寺動物園",kilo:1.29},{landmark:"通天閣",kilo:1.32},{landmark:"大阪市營 花園町站 ",kilo:0.72},{landmark:"南海 萩之茶屋站",kilo:0.34}],
          RT旅途雜誌:[{landmark:"天王寺動物園",kilo:1.29},{landmark:"通天閣",kilo:1.32},{landmark:"大阪市營 花園町站 ",kilo:0.72},{landmark:"南海 萩之茶屋站",kilo:0.34}],
          伊麗莎白旅居:[{landmark:"大阪日本橋",kilo:0.6},{landmark:"心齋橋商店街",kilo:0.78},{landmark:"大阪市營 長堀橋站 ",kilo:0.53},{landmark:"大阪市營 日本橋站",kilo:0.5}],
          藤和設計旅居:[{landmark:"大阪生活今昔館",kilo:2.18},{landmark:"HEP FIVE 摩天輪 ",kilo:2.74},{landmark:"阪急 南方站 ",kilo:0.46},{landmark:"大阪市營 西中島南方站",kilo:0.46}],
          STAYShamaison:[{landmark:"日本環球影城",kilo:4.69},{landmark:"空中庭園展望台",kilo:4.84},{landmark:"阪神 出來島站 ",kilo:0.67},{landmark:"阪神 千船站",kilo:0.88}],
          大阪SHE飯店:[{landmark:"日本環球影城",kilo:2.94},{landmark:"天保山大觀纜車",kilo:3.2},{landmark:" JR 弁天町站 ",kilo:0.55},{landmark:"大阪市營 弁天町站",kilo:0.55}],
          AFP旅居:[{landmark:"大阪日本橋",kilo:0.42},{landmark:"難波",kilo:0.76},{landmark:"大阪市營 日本橋站 ",kilo:0.34},{landmark:"近鐵 日本橋站",kilo:0.38}],
          每日公寓:[{landmark:"大阪城",kilo:0.82},{landmark:"西之丸庭園",kilo:0.97},{landmark:"JR 大阪城北詰站 ",kilo:0.27},{landmark:"大阪市營 大阪商務園區站",kilo:0.28}],
          歡樂假期:[{landmark:"札幌啤酒園",kilo:3.88},{landmark:"二條市場",kilo:4.33},{landmark:" JR 白石站 ",kilo:0.28},{landmark:"札幌市營 白石站",kilo:1.78}],
          大杜莎旅宿:[{landmark:"中島公園",kilo:1.39},{landmark:"薄野",kilo:1.48},{landmark:"札幌市營 西線9條旭山公園通站",kilo:0.25},{landmark:"札幌市營 西線11站",kilo:0.42}],
          條紋札幌公寓式酒店:[{landmark:"北海道舊道廳",kilo:0.63},{landmark:"時計台",kilo:0.98},{landmark:" JR 札幌站",kilo:0.39},{landmark:"札幌市營 新札幌站",kilo:0.48}],
          日光浴旅居:[{landmark:"羊蹄之丘展望台",kilo:2.53},{landmark:"札幌巨蛋",kilo:2.55},{landmark:"札幌市營 南平岸站",kilo:0.8},{landmark:"札幌市營 澄川站 ",kilo:1.25}],
          那日雅札幌旅館:[{landmark:"二條市場",kilo:0.68},{landmark:"札幌電視塔",kilo:0.98},{landmark:"札幌市營 菊水站",kilo:0.55},{landmark:"札幌市營 巴士中心前站 ",kilo:0.46}],
          高潔旅宿:[{landmark:"二條市場",kilo:0.39},{landmark:"札幌電視塔",kilo:0.73},{landmark:"札幌市營 豐水薄野站",kilo:0.45},{landmark:"札幌市營 巴士中心前站  ",kilo:0.59}],
          優品旅居:[{landmark:"中島公園",kilo:0.89},{landmark:"薄野",kilo:2.14},{landmark:"札幌市營 中之島站",kilo:0.15},{landmark:"札幌市營 幌平橋站  ",kilo:0.48}],
          札幌條紋公寓式飯店:[{landmark:"北海道舊道廳",kilo:0.63},{landmark:"時計台",kilo:0.98},{landmark:"JR 札幌站",kilo:0.39},{landmark:"札幌市營 新札幌站   ",kilo:0.48}],
        },
        cartLoading:false, 
      }
    },
    methods: {
      addCart() {
        const vm = this;
        this.cartLoading=true;
        this.$bus.$emit('getModalCart', vm.product.id, vm.product.qty);
        this.$bus.$on('loadingOver', loadingOver =>{
          vm.cartLoading=loadingOver;
          if(vm.product.qty !== 1){
            vm.product.qty=1;
          };
        });
      },
    },
    created() {
      const vm = this;
      this.$bus.$on('modalinfo', (modalInfo, singleProduct,hotel = false) => {
        vm.modal = modalInfo;
        vm.product = singleProduct;
        vm.isHotel = hotel;
        if(!vm.landmarks[vm.modal.modalTitle]){
          vm.landmark=[{landmark:"",kilo:0},{landmark:"",kilo:0},{landmark:"",kilo:0},{landmark:"",kilo:0}];
        }else{
          vm.landmark=vm.landmarks[vm.modal.modalTitle];
        };
      });    
    },
    mounted(){
      const vm=this;
      $('#modal').on('show.bs.modal',function(e){
          if(vm.product.qty !== 1){
            vm.product.qty=1
          }
      });  
    },
  }

</script>

<style scoped>
  .card {
    height: auto;
  }

  .modal-body img {
    min-height: 560px
  }
  .landmark span{
    display:block;
    font-size:25px;
    margin:0 auto;
  }
  .landmark p{
    line-height:20px;
    margin-top:10px;
    font-weight:bold;
    margin-bottom:0;
  }
  .landmark-wrap{
    border-bottom:1px solid rgba(220,219,220);
    border-top:1px solid rgba(220,219,220);
  }
 .modal-content{
   padding-bottom:0px;
 }
 .card-body{
   padding:0.5rem;
 }
</style>
