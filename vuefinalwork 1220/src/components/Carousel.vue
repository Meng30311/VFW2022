<template>
  <div>
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
           <router-link to="/tokyo">
             <img src="https://static.gltjp.com/glt/prd/data/article/13000/12052/20191110_220429_a19d59a4_w1920.jpg" class="d-block w-100" alt="...">
           </router-link>
           <div class="carousel-caption d-none d-md-block">
             <h4>東京</h4>
             <p>想要探訪日式文化，參訪明治神宮、淺草寺，豐富的東京景點可以讓你通通滿足！</p>
           </div>
        </div>
        <div class="carousel-item">
          <router-link to="/osaka">
            <img src="https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2020/10/26/1/8841931.jpg&x=0&y=0&sw=0&sh=0&sl=W&fw=1050" class="d-block w-100" alt="...">
          </router-link>
          <div class="carousel-caption d-none d-md-block">
             <h4>大阪</h4>
             <p>想要探訪日式文化，參訪明治神宮、淺草寺，豐富的東京景點可以讓你通通滿足！</p>
           </div>
        </div>
        <div class="carousel-item">
          <router-link to="/hokkaido">
            <img src="https://www.princehotels.co.jp/image/2019_10_top709_ningle_1.jpg" class="d-block w-100" alt="...">
          </router-link>
          <div class="carousel-caption d-none d-md-block">
             <h4>北海道</h4>
             <p>北海道氣候涼爽、四季分明，夏天可至富田農場賞薰衣草，秋天賞楓，冬天看雪祭，春季則絕對不能錯過五稜郭公園的賞櫻美景。</p>
           </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<script>
  export default{
     
  }
</script>

<style scoped>
  .carousel-height{
    height:200px
  }
  img{
    height:750px;
  }
  h4,p{
    text-shadow:0 1px 2px rgba(0,0,0,0.7);
  }
</style>