<template>
  <div>
    <header class="proHeader"
      :style="{backgroundImage: `url(${url})`}">
      <div class="container">
        <h3 class="masthead-subheading h1">{{title}}</h3>
        <div class="masthead-heading text-uppercase mt-3">{{text}}</div>
      </div>
    </header>    
  </div>
</template>

<script>
  export default{
    data(){
      return{
        title:'',
        text:'',
        url:'',
      }
    },
    methods:{
       
    },
    created(){
      
    },
    mounted(){
      const vm=this;
      this.$bus.$on('getHeader',(htitle,htext,imgurl)=>{
         vm.title=htitle;
         vm.text=htext;
         vm.url=imgurl;
      });
    },
  }
</script>


<style scoped lang="scss">
@import "../assets/helpers/card"; 
</style>