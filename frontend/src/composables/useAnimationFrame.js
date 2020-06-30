import { onMounted, onBeforeUnmount } from '@vue/composition-api'

export default function(fn) {
  let frame = null

  const loop = () => {
    fn()
    frame = window.requestAnimationFrame(loop)
  }

  onMounted(() => {
    frame = window.requestAnimationFrame(loop)
  })

  onBeforeUnmount(() => {
    window.cancelAnimationFrame(frame)
  })
}