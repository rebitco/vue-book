<template>
    <div>
      <MHeader>首页</MHeader>
      <div class="content">
        <Loading v-if="isLoading"></Loading>
        <template>
          <Swiper :swiperSlides="sliders"></Swiper>
          <div class="book-box">
            <h3>热门商品</h3>
            <ul>
              <li v-for="(book, key) in books">
                <img :src="book.bookCover">
                <b>{{book.bookName}}</b>
                <div class="book-des">{{book.bookInfo}}</div>
                <div class="book-price">￥{{book.bookPrice}}</div>
              </li>
            </ul>
          </div>
        </template>
      </div>
    </div>
</template>

<script>
  import MHeader from '../base/MHeader.vue';
  import Swiper from '../base/Swiper.vue';
  import Loading from '../base/Loading.vue';
  //import {getSliders, getHotBooks} from '../api/index.js';
  import {getHomeAll} from '../api/index.js';

    export default {
      name: "Home",
      created() {
        //this.getSlide();
        //this.getBook();
        this.getAllData();
      },
      data() {
        return {
          sliders: [],
          books: [],
          isLoading: true
        };
      },
      methods: {
        // async getSlide() {
        //   this.sliders = await getSliders(); //{data:sliders} 相当于拿到返回的数据, 取个别名来接. let result = data.sliders;
        // },
        // async getBook() {
        //   this.books = await getHotBooks();
        // },
        async getAllData() {
          let [sliders, books] = await getHomeAll();
          this.books = books;
          this.sliders = sliders;
          this.isLoading = false;
        },
      },
      components: {
          MHeader, Swiper, Loading
      }
    }
</script>

<style scoped lang="less">
  h3 {
    color: #888;
    margin: 0 0 5px 0;
    padding-bottom: 2px;
    border-bottom: 1px solid #ccc;
  }
  .book-box {
    width: 90%;
    margin: 0 auto;
    ul {
      display: flex;
      flex-wrap: wrap;/**默认不换行, 设置wrap后, 超出宽度, 自动换行*/
      padding: 0;
      margin-bottom: 10px;
      li {
        width: 50%;
        text-align: center;
        margin: 5px 0;
        background-color: #fff;

        img {
          width: 100%;
        }
        .book-des {
          color: #888888;
          font-size: 12px;
        }
        .book-price {
          color: #FF706F;
          font-size: 12px;
        }
      }
    }
  }
</style>
