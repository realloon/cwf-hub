<script setup lang="ts">
import { ref } from 'vue'
import emitter from '../utils/emitter'

const { parts } = defineProps<{
  parts: { defName: string; label: string }[]
}>()

const filteredParts = ref<string[]>(parts.map(part => part.defName))
</script>

<template>
  <form @change.prevent="emitter.emit('changeFilteredParts', filteredParts)">
    <label v-for="{ defName, label } in parts">
      <span>{{ label }}</span>
      <input
        type="checkbox"
        :name="defName"
        :value="defName"
        v-model="filteredParts"
      />
    </label>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-wrap: wrap;
  gap: 0 8px;
}

label {
  display: flex;
  align-items: center;

  span {
    text-transform: capitalize;
  }
}
</style>
