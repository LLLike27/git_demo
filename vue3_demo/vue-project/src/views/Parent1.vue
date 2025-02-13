<template>
  <div>
    <Child1 :countModel="countModel" @update:countModel="countModel = $event" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Child1 from './Child1.vue'
const countModel = ref(0)
</script>

<style lang="less" scoped>
</style>
