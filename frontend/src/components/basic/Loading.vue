<template functional>
<div class="loading" />
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style lang="postcss" scoped>
.loading {
  transition-duration: 100ms;
  @apply rounded-full w-24 h-24 border-purple-600 border-t-4 my-8 mx-auto;
  border-width: 16px;
  border-top: 16px solid #d53f8c;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>