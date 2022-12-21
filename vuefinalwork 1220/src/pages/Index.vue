<template>
  <div>
    <Header></Header>
    <Service/>
    <Carousel/>
    <ProductPreview/>
    <About/>
    <Footer/>
  </div>
</template>

<script>
 import Header from '@/components/Header'
 import Service from '@/components/Service'
 import Carousel from '@/components/Carousel'
 import ProductPreview from '@/components/ProductPreview'
 import About from '@/components/About'
 import Footer from '@/components/Footer'

 export default{
   components:{
     Header,
     Service,
     Carousel,
     ProductPreview,
     About,
     Footer,
   },
 }
</script>