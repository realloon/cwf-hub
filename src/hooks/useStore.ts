import { ref } from 'vue'

const filteredParts = ref<string[]>([])

export default function useStroe() {
  return { filteredParts }
}
