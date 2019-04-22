<template>
  <div id="app">
    <!-- 缓存情况下走这一段 -->
    <transition name="fade-in-out">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <!-- 正常情况下走这一段 -->
    <transition name="fade-in-out">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <Tab></Tab>
  </div>
</template>

<script>
  import Tab from './base/Tab.vue';

export default {
  name: 'App',
  components: {
    Tab
  }
}
</script>

<style>
  //全局样式放这里
  *{
    padding: 0;
    margin: 0;
  }
  body {
    padding: 0;
    margin: 0;
  }
  ul, li {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
  input, button {
    -webkit-appearance: none;
  }
  .content {
    position: absolute;
    width: 100%;
    top: 40px;
    bottom: 50px;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #F9F9F9;
  }
  .fade-in-out-enter {
    opacity: 0;
  }
  .fade-in-out-enter-active {
    transition: all 0.3s linear;
  }
  .fade-in-out-leave-active {
    transition: all 0.3s linear;
    opacity: 1;
  }

</style>
