<template>
  <div>
    <section class="page-section bg-light" id="portfolio">
      <div class="container">
        <div class="text-center">
          <h2 class="section-heading text-uppercase">TOP1 日本旅遊-東京</h2>
          <p class="section-subheading text-muted">日本自由行到東京想要探訪日式文化，參訪明治神宮、淺草寺；或是到準備大肆採購，
            從年輕的澀谷、表參道逛到貴婦必來的銀座與六本木，豐富的東京景點可以讓你通通滿足！</p>
        </div>
        <div class="row">
          <div class="col-lg-4 col-sm-6 mb-4">
            <div class="portfolio-item">
              <a class="portfolio-link" data-toggle="modal" href="#modal" @click="modalInfo(id=0)" >
                <div class="portfolio-hover">
                  <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                </div>
                <img class="img-fluid" ref="img1"
                  src="https://resources.matcha-jp.com/resize/720x2000/2019/06/18-79790.jpeg"  />
              </a>
              <div class="portfolio-caption">
                <div class="portfolio-caption-heading" ref="title1">築地市場</div>
                <div class="portfolio-caption-subheading text-muted" ref="text1">築地市場價格親民，是到東京自由行的你，品嚐新鮮海鮮的最佳去處。</div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-sm-6 mb-4">
            <div class="portfolio-item">
              <a class="portfolio-link" data-toggle="modal" href="#modal" @click="modalInfo(id=1)">
                <div class="portfolio-hover">
                  <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                </div>
                <img class="img-fluid" ref="img2"
                  src="https://static.gltjp.com/glt/prd/data/article/11000/10443/20171015_034313_6dcc31ea_w1920.jpg"
                  alt="" />
              </a>
              <div class="portfolio-caption">
                <div class="portfolio-caption-heading" ref="title2">明治神宮</div>
                <div class="portfolio-caption-subheading text-muted" ref="text2">明治神宮位置鬧中取靜，是日本神道信仰重要地標，擁有日本最大木製鳥居。</div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-sm-6 mb-4">
            <div class="portfolio-item">
              <a class="portfolio-link" data-toggle="modal" href="#modal" @click="modalInfo(id=2)" >
                <div class="portfolio-hover">
                  <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                </div>
                <img class="img-fluid" ref="img3"
                  src="https://www.bring-you.info/wp-content/uploads/2019/05/senso-ji-2.jpg"
                  alt="" />
              </a>
              <div class="portfolio-caption">
                <div class="portfolio-caption-heading" ref="title3">淺草寺</div>
                <div class="portfolio-caption-subheading text-muted" ref="text3">淺草寺表參道可以一次買齊各式特色東京伴手禮，可是說是最富日式風味的東京景點。</div>
              </div>
            </div>
          </div>
          <div class="text-center my-3 w-100">
            <span class="section-subheading text-muted">我們提供了東京眾多選擇的日本民宿，無論最後決定要探訪哪些東京景點，
              都可以找到適合晚上落腳休息的地方，為自己的日本自由行選擇最佳的住宿地點！</span>
          </div>
          <div class="col-lg-4 col-sm-6 mb-4 mb-lg-0">
            <div class="portfolio-item">
              <a class="portfolio-link" data-toggle="modal" href="#modal" @click="modalInfo(id=3)" >
                <div class="portfolio-hover">
                  <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                </div>
                <img class="img-fluid" ref="img4" src="https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="" />
              </a>
              <div class="portfolio-caption">
                <div class="portfolio-caption-heading" ref="title4">淺草和草旅宿</div>
                <div class="portfolio-caption-subheading text-muted" ref="text4">位於風景優美的淺草地區，是您探討文化、觀光、購物的絕佳選擇。</div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-sm-6 mb-4 mb-sm-0">
            <div class="portfolio-item">
              <a class="portfolio-link" data-toggle="modal" href="#modal" @click="modalInfo(id=4)" >
                <div class="portfolio-hover">
                  <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                </div>
                <img class="img-fluid" ref="img5" src="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80"
                  alt="" />
              </a>
              <div class="portfolio-caption">
                <div class="portfolio-caption-heading" ref="title5">東京池袋旅居</div>
                <div class="portfolio-caption-subheading text-muted" ref="text5">地點位置優越，距離JR山手線池袋站東口步行僅5分鐘。</div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-sm-6">
            <div class="portfolio-item">
              <a class="portfolio-link" data-toggle="modal" href="#modal" @click="modalInfo( id=5)">
                <div class="portfolio-hover">
                  <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                </div>
                <img class="img-fluid" ref="img6" src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80"
                  alt="" />
              </a>
              <div class="portfolio-caption">
                <div class="portfolio-caption-heading" ref="title6">新宿御苑綠景房</div>
                <div class="portfolio-caption-subheading text-muted" ref="text6">每一間均有一個獨特的主題，這間的主題是優雅恬靜，讓人有疲勞紓解的感覺。</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Modal/>
  </div>
</template>

<script>
 import Modal from './Modal'

 export default{
     components:{
         Modal,
     },
     data(){
         return {
             modal:{
                 title:[],
                 src:[],
                 text:[],    
             },
             emitInfo:{
                 modalSrc:'',
                 modalTitle:'',
                 modalText:'',
             },
             singleProduct: {
                 origin_price: '',
                 price: '',
                 id: '',
                 qty: 1,
             },
             ref:{},
         }
     },
     methods:{
         modalInfo(id){
             const vm=this;
             this.modal.src.push(vm.ref.img1.src,vm.ref.img2.src,
               vm.ref.img3.src,vm.ref.img4.src,vm.ref.img5.src,vm.ref.img6.src);

             this.modal.title.push(vm.ref.title1.innerHTML,vm.ref.title2.innerHTML,
               vm.ref.title3.innerHTML,vm.ref.title4.innerHTML,vm.ref.title5.innerHTML,vm.ref.title6.innerHTML); 

             this.modal.text.push(vm.ref.text1.innerHTML,vm.ref.text2.innerHTML,
               vm.ref.text3.innerHTML,vm.ref.text4.innerHTML,vm.ref.text5.innerHTML,vm.ref.text6.innerHTML);   

             this.emitInfo.modalSrc=vm.modal.src[id];
             this.emitInfo.modalText=vm.modal.text[id];
             this.emitInfo.modalTitle=vm.modal.title[id];
             this.$bus.$emit('modalinfo',vm.emitInfo,vm.singleProduct); 
         },
     },
     mounted(){
         const vm=this;
         this.ref=vm.$refs
     }
 }
</script>


<style scope>
  .portfolio-link {
    height: 267px
  }

  .img-fluid {
    height: 100%
  }

  .portfolio-item {
    border-radius: 10px
  }

</style>
