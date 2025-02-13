<template>
  <div>
    <div>Parent bound v-model is: {{ countModel }}</div>
    <button @click="update">Increment</button>
  </div>
</template>

<script setup>
const props = defineProps(['countModel'])
const emit = defineEmits(['update:countModel'])
function update() {
  emit('update:countModel', props.countModel + 1)
}
</script>

<style lang="less" scoped>
</style>
