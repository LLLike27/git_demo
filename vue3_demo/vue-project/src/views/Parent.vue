<template>
  <div>
    <Child v-model="countModel" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Child from './Child.vue'
const countModel = ref()
</script>

<style lang="less" scoped>
</style>
