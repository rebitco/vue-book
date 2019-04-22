<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide, key) in swiperSlides" :key="key">
      <img :src="slide" alt="">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
    name: 'carrousel',
    props: ['swiperSlides'], //Home.vue传过来的属性, 这样取this.swiperSlides
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          }
        },
        //swiperSlides: [1, 2, 3, 4, 5]
      }
    },
    // mounted() {
    //   setInterval(() => {
    //     console.log('simulate async data')
    //     if (this.swiperSlides.length < 10) {
    //       this.swiperSlides.push(this.swiperSlides.length + 1)
    //     }
    //   }, 3000)
    // }
  }
</script>
<style scoped>
  img {
    width: 100%;
  }
</style>
