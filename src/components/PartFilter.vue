<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  parts: { id: string; label: string }[]
}

defineProps<Props>()

const selected = ref<string[]>([])
</script>

<template>
  <section>
    <pre>{{ selected }}</pre>
    <label v-for="{ id, label } in parts">
      <span> {{ label }}</span>
      <input type="checkbox" :name="id" :value="id" v-model="selected" />
    </label>
  </section>
</template>

<style scoped></style>
