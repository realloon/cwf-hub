<script setup lang="ts">
import useStroe from '../hooks/useStore'

defineProps<{
  parts: { defName: string; label: string }[]
}>()

const { filteredParts } = useStroe()
</script>

<template>
  <section>
    <label v-for="{ defName, label } in parts">
      <span> {{ label }}</span>
      <input
        type="checkbox"
        :name="defName"
        :value="defName"
        v-model="filteredParts"
      />
    </label>
  </section>
</template>

<style scoped>
section {
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
