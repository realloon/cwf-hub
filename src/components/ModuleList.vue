<script setup lang="ts">
import type { ModuleDef } from '../types'

defineProps<{
  moudles: any[]
}>()
</script>

<template>
  <section v-for="module in moudles">
    <h2>{{ module.label }}</h2>
    <details>
      <summary>Info</summary>
      <pre>{{ module }}</pre>
    </details>
  </section>
</template>

<style scoped>
h2 {
  text-transform: capitalize;
}
</style>
