<template>
  <div class="col-md-4">
    <div class="card">
      <template>     
        <span class="heart" :class="{'d-none':!heart.fullHeart}" @click="delFav(item)" data-toggle="tooltip" 
              data-placement="right" title="取消最愛">
          <i class="fas fa-heart"></i>
        </span>
      </template>
      <template>
        <span class="heart" @click="addFav(item)" :class="{'d-none':heart.fullHeart}" data-toggle="tooltip" 
              data-placement="right" title="加入最愛">
          <i class="far fa-heart"></i>
        </span>
      </template>
      <div class="card-img-top" :style="{ backgroundImage: `url(${item.imageUrl}` }">
      </div>
      <div class="card-body">
        <h4 class="card-title">
          <span class="icon"><i class="fas fa-bed"></i></span>
          <span class="ml-2">{{ item.title }}</span>
        </h4>
        <p class="card-text">{{ item.description }}</p>
        <div class="d-flex justify-content-between">
          <a href="#" class="btn btn-outline-primary"  @click.prevent="single(item.id)">
            <template v-if="loadingStatus.modalLoading && (loadingStatus.loadingItem === item.id)">
              <span class="mr-2">
                <i class="fas fa-spinner fa-spin"></i>
              </span>
            </template>
            <template v-else>
              <span class="mr-2">
                <i class="fas fa-search-plus"></i>
              </span>
            </template>
            <span>查看更多</span>
          </a>
          <a href="#" class="btn btn-outline-primary" @click.prevent="addCart(item.id)">
            <template v-if="loadingStatus.isCart && (loadingStatus.loadingItem === item.id)">
              <span class="mr-2">
                <i class="fas fa-spinner fa-spin"></i>
              </span>
            </template>
            <template v-else>
              <span class="mr-2">
                <i class="fas fa-cart-plus"></i>
              </span>
            </template>
            <span>加入購物車</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default{
    props:['item'],
    data(){
      return {
          loadingStatus: {
            modalLoading: false,
            loadingItem: '',
            isCart: false,
          },
          heart:{
            fullHeart:false,
            whoChange:''
          },
          toolTitle:'加入最愛',
      }
    },
    methods:{
        single(singleId){
           const vm=this;
           vm.loadingStatus.loadingItem = singleId;
           vm.loadingStatus.modalLoading = true;
           vm.$bus.$emit('getSingle',singleId);
        },
        addCart(cartId){
           const vm=this; 
           vm.loadingStatus.loadingItem = cartId;
           vm.loadingStatus.isCart = true;
           vm.$bus.$emit('addCart',cartId);
        },
        addFav(item){
          const vm=this;
          let localFav=JSON.parse(localStorage.getItem('fav')) || [];
          let localBrows=JSON.parse(localStorage.getItem('最近瀏覽')) || [];
          vm.heart.fullHeart=true;
          vm.heart.whoChange=item.title;
          localBrows.filter(browitem =>{
            if(item.title == browitem.title){
              browitem.isFav=true;
            }
          });
          localStorage.setItem('最近瀏覽',JSON.stringify(localBrows));
          vm.$bus.$emit('updateStorage');

          let favItem={
            city:item.category,
            isFav:true,
            src:item.imageUrl,
            title:item.title
          };
          localFav.push(favItem);
          localStorage.setItem('fav',JSON.stringify(localFav));
          vm.$bus.$emit('getFav');
          vm.$bus.$emit('message:push', '已加入最愛', 'success');
        },
        delFav(delitem){
          const vm=this;
          let localFav=JSON.parse(localStorage.getItem('fav')) || [];
          let delItem=localFav.filter(item =>{
            return item.title == delitem.title
          });   
          let delIndex=localFav.indexOf(...delItem);
          localFav.splice(delIndex,1);
          localStorage.setItem('fav',JSON.stringify(localFav));
          vm.$bus.$emit('getFav');
          vm.heart.fullHeart=false;
          vm.heart.whoChange='';
          vm.$bus.$emit('message:push', '已取消最愛', 'danger');
        },
        changeHeart(){
          const vm=this;
          let localFav=JSON.parse(localStorage.getItem('fav')) || [];
          let isFav=localFav.some(item =>{
            return vm.item.title == item.title
          });
          if(isFav){
             vm.heart.fullHeart=true
          }else{
             vm.heart.fullHeart=false
          };
        },
        prop(){
          console.log(123)
        },
    },
    created(){
        const vm=this;
        vm.$bus.$on('stopLoading',()=>{
           vm.loadingStatus.loadingItem = '';
           vm.loadingStatus.modalLoading = false;
           vm.loadingStatus.isCart = false;
        });
        vm.changeHeart(); 
        vm.$bus.$on('changeCardHeart', () =>{
            vm.changeHeart()
        });
        $(function () {
          $('[data-toggle="tooltip"]').tooltip()
        });
    },
  }
</script>


<style scoped lang="scss">
@import "../assets/helpers/card";
 
</style>