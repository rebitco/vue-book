<template>
    <div>
      <MHeader>列表</MHeader>
      <div class="content" ref="scroll" @scroll="loadMore"><!-- @scroll滚动事件 -->
        <ul>
          <router-link v-for="(book, key) in books" :to="{name: 'detail', params: {bid: book.bookId}}" :key="key" tag="li">
            <div class="book-left">
              <img v-lazy="book.bookCover" alt="">
            </div>
            <div class="book-right">
              <h4>{{book.bookName}}</h4>
              <p class="book-des">{{book.bookInfo}}</p>
              <p class="book-price">￥{{book.bookPrice}}</p>
              <div>
                <button @click.stop="del(book.bookId)">删除</button><!-- .stop 阻止事件冒泡-->
              </div>
            </div>
          </router-link>
        </ul>
        <div class="load">{{load}}</div>
      </div>
    </div>
</template>

<script>
import MHeader from '../base/MHeader.vue'
import {pagination, deleteBook} from '../api/index.js'

export default {
  name: 'List',
  created () {
    this.getBookData()
  },
  data () {
    return {
      books: [],
      hasMore: true,
      offset: 0,
      isLoading: false,
      load: '加载更多...'
    }
  },
  methods: {
    loadMore () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        // scrollTop - 滑出屏幕的高度, clientHeight - 屏幕的高度, scrollHeight - 滑动的总高度
        let {scrollTop, clientHeight, scrollHeight} = this.$refs.scroll
        if (scrollTop + clientHeight + 20 > scrollHeight) {
          this.getBookData()
          if (this.hasMore === false) {
            this.load = '没有更多的数据'
          };
        };
      }, 13)
    },
    async getBookData () {
      // this.books = await getBooks();
      if (this.hasMore && !this.isLoading) { // 有更多数据才进来
        this.isLoading = true
        let {hasMore, books} = await pagination(this.offset)
        this.hasMore = hasMore
        this.books = [...this.books, ...books] // 新旧数据一起
        this.offset = this.books.length
        this.isLoading = false
      };
    },
    async del (id) {
      await deleteBook(id) // 后台删数据
      this.books = this.books.filter(item => item.bookId !== id) // 前台删数据
    }
  },
  components: {
    MHeader
  }
}
</script>

<style scoped>
  .content ul {
    width: 95%;
    margin: 10px auto;
    padding: 0;
  }
  .content ul li {
    display: flex;
    background-color: #fff;
    margin: 10px 0;
    box-shadow: 3px 5px 7px 3px rgba(29, 29, 31, 0.09);
  }
  .book-left {
    width: 30%;
  }
  .book-left img {
    width: 100%;
  }
  .book-right {
    width: 70%;
  }
  .book-right h4, .book-right .book-price {
    margin: 0;
  }
  .book-right button {
    background-color: #e64340;
    color: #fff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    border: none;
  }
  .book-des {
    color: #888888;
    font-size: 12px;
  }
  .book-price {
    color: #FF706F;
    font-size: 12px;
  }
  .load {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    text-align: center;
    padding: 5px 0;
  }
</style>
