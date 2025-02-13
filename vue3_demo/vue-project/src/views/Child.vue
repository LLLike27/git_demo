<template>
  <div>
    <div>Parent bound v-model is: {{ model }}</div>
    <button @click="update">Increment</button>
  </div>
</template>

<script setup>
// const model = defineModel()
const model = defineModel({ required: true, default: 2 })

function update() {
  console.log(model.value)
  model.value++
}
</script>

<style lang="less" scoped>
</style>
