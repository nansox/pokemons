<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    options: { [key: string]: string }
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
}>()

const vModel = computed({ get: () => props.value, set: (nVal) => emit('update:value', nVal) })
const optionsList = computed(() =>
  Object.keys(props.options).map((key) => ({ key, text: props.options[key] }))
)
</script>

<template>
  <select v-model="vModel">
    <option value="">{{ props.placeholder }}</option>
    <option v-for="{ key, text } in optionsList" :key="`pk-select-${key}`">{{ text }}</option>
  </select>
</template>

<style scoped></style>
