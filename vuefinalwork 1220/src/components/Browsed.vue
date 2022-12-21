<template>
  <div>
    <hr height="2">
    <div class="browsedContainer">
      <h3 class="mb-2">最近瀏覽</h3>
      <ul class="browseList row">
        <li class="col-3 browseLi" v-for="(item,index) in browsedItem">
          <a href="#" class="browBackground" :style="{backgroundImage:`url(${item.src})`}"
             @mouseover="getTitle(item.title)" @mouseleave="hover=false">  
             <span class="xIcon" :class="{'showX':hover && item.title == WhoshowX}"
             @click="delBrow"></span> 
             <span  @click.prevent="AddDelFav(item,index)">           
               <i class="far fa-heart favIcon" :class="{'showX':hover && item.title == whoShowFav}" 
                v-if="!item.isFav" title="加入最愛"></i>       
               <i class="fas fa-heart favIcon" :class="{'showX':hover && item.title == whoShowFav}" 
                v-else></i>
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
        browsedItem:[],
        hover:false,
        WhoshowX:'',
        whoShowFav:'',
        localFav:[],
      }
    },
    methods:{
       getBrowsedItem(){
         const vm=this;
         vm.browsedItem=JSON.parse(localStorage.getItem('最近瀏覽')) || [];
       },
       getTitle(title){
        const vm=this;
        vm.hover=true;
        vm.WhoshowX=title;
        vm.whoShowFav=title;
       },
       delBrow(e){
        e.preventDefault();
        const vm=this;
        let delItem=vm.browsedItem.filter(item =>{
          return item.title == vm.WhoshowX
        });
        let delIndex=vm.browsedItem.indexOf(...delItem);
        vm.browsedItem.splice(delIndex,1);
        localStorage.setItem('最近瀏覽',JSON.stringify(vm.browsedItem));
       },
       AddDelFav(favitem,browindex){
        const vm=this;
        if(!favitem.isFav){ 
          vm.localFav=JSON.parse(localStorage.getItem('fav'));
          let isRepeat=vm.localFav.some(item =>{
              return favitem.title == item.title
          });
          if(!isRepeat){vm.localFav.push(favitem)};
          localStorage.setItem('fav',JSON.stringify(vm.localFav)); 
          vm.browsedItem[browindex].isFav=true;
          localStorage.setItem('最近瀏覽',JSON.stringify(vm.browsedItem));
          vm.$bus.$emit('getFav');
          vm.$bus.$emit('changeCardHeart');
        }else{
          let delItem=vm.localFav.filter(item =>{
            return item.title == favitem.title
          });   
          let delIndex=vm.localFav.indexOf(...delItem);
          vm.localFav.splice(delIndex,1);
          localStorage.setItem('fav',JSON.stringify(vm.localFav));
          vm.browsedItem[browindex].isFav=false;
          localStorage.setItem('最近瀏覽',JSON.stringify(vm.browsedItem));
          vm.$bus.$emit('getFav');
          vm.$bus.$emit('changeCardHeart');
        };
       },
    },
    mounted(){
        const vm=this;
        this.getBrowsedItem();
        this.$bus.$on('updateStorage',()=>{
            vm.getBrowsedItem();
        });
    },
    created(){
      const vm=this;
      vm.localFav=JSON.parse(localStorage.getItem('fav')) || [];
    },
  }
</script>

<style scoped>
  .browseList{
    list-style:none;
    padding:0;
  }
  .browBackground{
    display:block;
    width:100%;
    height:150px;
    background-position:center;
    background-size:cover;
    border-radius:5px;
    position:relative;
  }
  h4{
    text-align:center;
  }
  .browseLi{
    position:relative;
  }
  
  .xIcon{
    display:block;
    background:#f2f2f2 url(../assets/img/x.png) no-repeat 50% /50%;
    width: 25px;
    height: 25px;
    border-radius:2px;
    cursor:pointer;
    position:absolute;
    right:0;
    opacity:0;
  }
  .favIcon{
    display:block;
    width: 25px;
    height: 25px;
    border-radius:2px;
    cursor:pointer;
    position:absolute;
    left:0;
    opacity:0;
    text-align:center;
    line-height:25px;
    color:#ff3333;
  }
  .showX{
    opacity:0.7;
    transition:all 0.7s;
  }
</style>