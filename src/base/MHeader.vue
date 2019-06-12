<template>
    <div class="header">
      <slot></slot>
      <i class="iconfont icon-fanhui" v-if="back" @click="goback"></i>
    </div>
</template>

<script>
export default {
  name: 'MHeader',
  props: {
    back: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
  .header {
    background-color: #576b95;
    height: 40px;
    line-height: 40px;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    text-align: center;
    font-weight: 600;
    color: #fff;
    i {
      position: absolute;
      left: 10px;
      font-size: 22px;
    }
  }
</style>
