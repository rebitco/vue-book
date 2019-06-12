<template>
    <div>
      <MHeader :back="true">添加</MHeader>
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
            <label for="bookCover">封 面</label>
            <input type="text" id="bookCover" v-model="book.bookCover">
          </li>
          <li>
            <label for="bookCover">数 量</label>
            <button @click="setCount(count+1)">+</button>
            <span>{{count}}</span>
            <button @click="setCount(count-1)">-</button>
          </li>
          <li>
            <button @click="addNewBook">添 加</button>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import MHeader from '../base/MHeader.vue'
import {addBook} from '../api/index.js'
import { store, mutations } from '../store/store' // Vue2.6新增API Observable

export default {
  name: 'Add',
  data () {
    return {
      book: {}
    }
  },
  computed: {
    count () {
      return store.count
    }
  },
  components: {
    MHeader
  },
  methods: {
    async addNewBook () {
      await addBook(this.book)
      this.$router.push('/list')
    },
    setCount: mutations.setCount
  }
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
    z-index: 1;
  }
</style>
