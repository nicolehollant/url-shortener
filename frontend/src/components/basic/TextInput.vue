<template>
<label class="block" :for="$attrs.id || $attrs.name">
  <slot name="label" />
  <textarea
    v-if="multiline"
    :name="$attrs.name || $attrs.id"
    :id="$attrs.id || $attrs.name" 
    :placeholder="$attrs.placeholder"
    class="block w-full px-2 py-4 font-medium rounded-lg border-2 border-pink-300 focus:outline-none focus:shadow-outline resize-y bg-pink-100 hover:bg-white transition duration-300"
    :class="{'border-orange-700': error !== ''}"
    @input="$emit('input', $event.target.value)"
    :value="value"
  />
  <input
    :type="$attrs.type || 'text'"
    v-else
    :name="$attrs.name || $attrs.id"
    :id="$attrs.id || $attrs.name" 
    :placeholder="$attrs.placeholder"
    class="block w-full px-2 py-4 font-medium rounded-lg border-2 border-pink-300 focus:outline-none focus:shadow-outline bg-pink-100 hover:bg-white transition duration-300"
    :class="{'border-orange-700': error !== ''}"
    @input="$emit('input', $event.target.value)"
    :value="value"
  />
  <p v-if="error" class="mt-1 text-sm font-medium text-orange-700">
    {{ error }}
  </p>
</label>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    multiline: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      required: true
    },
    error: {
      type: String,
      default: '',
    },
  }
}
</script>