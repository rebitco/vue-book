<template>
    <div>
      <MHeader :back="true"></MHeader>
      <div class="detail-box">
        <ul>
          <li>
            <label for="bookName">书 名</label>
            <input type="text" id="bookName" v-model="book.bookName">
          </li>
          <li>
            <label for="bookInfo">描 述</label>
            <input type="text" id="bookInfo" v-model="book.bookInfo">
          </li>
          <li>
            <label for="bookPrice">价 格</label>
            <input type="text" id="bookPrice" v-model="book.bookPrice">
          </li>
          <li>
            <button @click="updateBookInfo">提交修改</button>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import MHeader from '../base/MHeader.vue';
  import {getOneBook, updateBook} from '../api/index.js';

    export default {
        name: "Detail",
      data() {
          return {
            book: {}
          }
      },
      components: {
        MHeader
      },
      watch: {
          $route() {
            //路由一旦发生改变, 就重新加载数据
            this.getBookDetail();
          }
      },
      created() {
          this.getBookDetail();
      },
      methods: {
        async getBookDetail() {
          this.book = await getOneBook(this.bid);
          //如果是空对象, 就跳转回列表页
          Object.keys(this.book).length === 0 ? this.$router.push('/list') : void 0;
        },
        async updateBookInfo() {
          await updateBook(this.bid, this.book);
          this.$router.push('/list');//修改完成后, 跳回列表页
        },
      },
      computed: {
          bid() {
            return this.$route.params.bid;
          },
      },
    }
</script>

<style scoped>
  .detail-box {
    position: absolute;
    top: 40px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 100;
  }
</style>
