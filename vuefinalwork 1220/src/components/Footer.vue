<template>
  <div>
    <footer class="footer py-4">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-4 text-lg-left">Copyright © Your Website 2020</div>
          <div class="col-lg-4 my-3 my-lg-0">
            <a class="btn btn-dark btn-social mx-2 twitter" href="#!"><i class="fab fa-twitter"></i></a>
            <a class="btn btn-dark btn-social mx-2 facebook" href="#!"><i class="fab fa-facebook-f"></i></a>
            <a class="btn btn-dark btn-social mx-2 linkedin" href="#!"><i class="fab fa-linkedin-in"></i></a>
          </div>
          <div class="col-lg-4 text-lg-right">
            <a class="mr-3" href="#!">Privacy Policy</a>
            <a href="#!">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
  .footer{
      background-color:rgba(52, 58, 64,0.95);
      color:white;
      margin-top:70px;
  }
  .twitter{
      background-color:rgba(29, 161, 242);
      border-color:rgba(29 ,161, 242);
  }
  .twitter:hover{
      background-color:rgba(7, 149, 234);
      border-color:rgba(7, 149, 234);
  }
  .facebook{
      background-color:rgba(66,102,179);
      border-color:rgba(66,102,179);
  }
  .facebook:hover{
      background-color:rgba(68,98,162);
      border-color:rgba(68,98,162);
  }
  .linkedin{
      background-color:rgba(14,118,168);
      border-color:rgba(14,118,168);
  }
  .linkedin:hover{
      background-color:rgba(11,112,175);
      border-color:rgba(11,112,175);
  }
</style>