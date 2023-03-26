<script setup lang="ts">
import { computed } from 'vue'
import IconSearch from './icons/IconSearch.vue'

const props = withDefaults(
  defineProps<{
    value?: string
    placeholder?: string
  }>(),
  {
    value: '',
    placeholder: ''
  }
)
const emit = defineEmits<{
  (event: 'update:value', value: string): void
  (event: 'search', value: string): void
}>()

const vModel = computed({ get: () => props.value, set: (nVal) => emit('update:value', nVal) })
</script>

<template>
  <div class="pk-search-input">
    <div class="pk-search-input_button">
      <button @click="emit('search', vModel)"><IconSearch /></button>
    </div>
    <input
      type="text"
      v-model="vModel"
      :placeholder="props.placeholder"
      @keypress.enter="emit('search', vModel)"
    />
  </div>
</template>

<style scoped>
.pk-search-input {
  position: relative;
}
.pk-search-input_button {
  top: 0;
  bottom: 0;
  position: absolute;
  display: flex;
  align-items: center;
  left: 4px;
}
button {
  border: 0 solid transparent;
  background-color: transparent;
  padding-top: 4px;
  border-radius: 0.2rem;
}
button:hover {
  background-color: var(--light-grey);
}
input {
  padding-left: 2rem;
}
</style>
