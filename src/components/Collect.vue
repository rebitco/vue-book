<template>
    <div>
      <MHeader>收藏</MHeader>
      <aMap></aMap>
      <Tab></Tab>
    </div>
</template>

<script>
import MHeader from '../base/MHeader.vue'
import aMap from '../base/Map.vue'
import Tab from '../base/Tab'

export default {
  name: 'Collect',
  components: {
    MHeader, aMap, Tab
  }
}
</script>

<style scoped>
  .aMap {
    margin-top: 100px;
  }
</style>
