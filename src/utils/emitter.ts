import mitt from 'mitt'

const emitter = mitt<{
  changeFilteredParts: string[]
}>()

export default emitter
