<template>
<div class="min-h-screen flex justify-center">
  <div class="container space-y-8 px-6" style="margin-top: 20vh">
    <h1 class="text-2xl text-center font-bold text-pink-500">
      URL Shortener
    </h1>
    <TextInput name="title" v-model="url" class="max-w-lg mx-auto w-full">
      <template v-slot:label>
        <p class="text-pink-800 font-semibold text-sm tracking-wide">
          URL:
        </p>
      </template>
    </TextInput>
    
    <div class="flex justify-center">
    <button @click="submit" class="font-bold px-4 py-2 bg-pink-600 text-white rounded-lg shadow-lg transition duration-300 hover:bg-pink-800 focus:outline-none focus:shadow-outline">
      submit
    </button>
    </div>

    <Loading v-if="responseState.loading" />

    <div v-if="responseState.error" class="w-full mx-auto text-center max-w-lg">
      <h2 class="text-blue-700 font-bold text-xl">error</h2>
      <p class="text-blue-800 font-medium lowercase">
        {{ responseState.result.error }}
      </p>
    </div>
    <textarea name="template" id="" class="sr-only whitespace-pre-wrap" aria-hidden ref="clipboardCode" v-model="clipboard" />
    <div class="space-y-8 max-w-sm mx-auto mx-auto" v-if="clipboard !== ''">
      <div class="grid gap-1">
        <p class="text-pink-800 font-semibold text-sm tracking-wide">
          Copy:
        </p>
        <button 
          @click="copy" 
          class="text-purple-900 px-4 py-2 grid items-center space-x-4 rounded-lg border-2 border-pink-400 bg-pink-300 focus:outline-none hover:shadow hover:bg-pink-600 hover:border-pink-600 hover:text-white focus:shadow-outline focus:border-pink-300 transition duration-300"
          style="grid-template: 1fr /1fr auto"
        >
          <div class="text-left font-medium break-all truncate">{{ clipboard }}</div>
          <svg class="-mt-px w-6 h-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
        </button>
      </div>
      <div class="flex justify-center">
        <a v-if="copied" class="px-3 text-indigo-600 font-semibold text-lg border-b-2 border-pink-200 hover:border-indigo-800 transition duration-300" :href="clipboard" target="_blank" rel="noopener noreferrer">
          visit
        </a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { useEndpoint } from '@/composables'
import { ref, computed } from '@vue/composition-api'
export default {
  name: 'Home',
  setup() {
    const copied = ref(false)
    const clipboardCode = ref(null)
    const clipboard = computed(() => {
      const shortId = responseState?.result?.short_id
      if(shortId) {
        return `http://localhost:4000/api/${shortId}`
      } else {
        return ''
      }
    })
    const url = ref('')

    const { post, responseState } = useEndpoint()

    function submit() {
      post('api/new', {
        url: url.value
      })
      copied.value = false
    }

    function copy() {
      setTimeout(() => {
        clipboardCode.value.select()
        document.execCommand('copy')
        copied.value = true
      }, 300)
    }

    return { 
      url, 
      submit, 
      responseState,
      copy,
      clipboard,
      clipboardCode,
      copied,
    }
  }
}
</script>