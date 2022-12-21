<template>
  <div>
    <hr height="2">
    <div class="favContainer">
      <h3 class="mb-2">我的最愛</h3>
      <ul class="row favUl">
        <li class="col-3" v-for="(item,index) in favAry">
          <a href="#" class="favBack" :style="{backgroundImage:`url(${item.src})`}">
            <span class="favIcon" @click.prevent="delFav(item)">
              <i class="fas fa-heart"></i>
            </span>
          </a>
          <h4 class="mt-2">{{item.title}}</h4>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        favAry:[],
      }
    },
    methods:{
       getLocalFav(){
        const vm=this;
        vm.favAry=JSON.parse(localStorage.getItem('fav')) || [];
       },
       delFav(ditem){
        const vm=this;
        let delItem=vm.favAry.filter(item =>{
          return item.title == ditem.title
        });
        let delIndex=vm.favAry.indexOf(...delItem);
        vm.favAry.splice(delIndex,1);
        localStorage.setItem('fav',JSON.stringify(vm.favAry));
        let browsItem=JSON.parse(localStorage.getItem('最近瀏覽')) || [];
        browsItem.filter(item =>{
          if(item.title == ditem.title){
            item.isFav=false;
          }
        });
        localStorage.setItem('最近瀏覽',JSON.stringify(browsItem));
        vm.$bus.$emit('updateStorage');
        vm.$bus.$emit('changeCardHeart');
       },
    },
    mounted(){
      const vm=this;
      vm.getLocalFav();
      this.$bus.$on('getFav',() =>{
          vm.getLocalFav();
      });
    },
  }
</script>


<style scoped>
  .favUl{
    list-style:none;
    padding:0;
  }
  h4{
    text-align:center;
  }
  .favBack{
    display:block;
    width:100%;
    height:150px;
    background-position:center;
    background-size:cover;
    border-radius:5px;
    position:relative;
  }
  .favIcon{
    display:block;
    width: 25px;
    height: 25px;
    border-radius:2px;
    cursor:pointer;
    position:absolute;
    left:0;
    opacity:0.7;
    text-align:center;
    line-height:25px;
    color:#ff3333;
  }
</style>