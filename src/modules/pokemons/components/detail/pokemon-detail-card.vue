<script setup lang="ts">
import PkSpinner from '@/common/components/pk-spinner.vue'
import { CallStatus } from '@/common/store/types'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{ title: string; color: string; statusCall?: CallStatus }>(),
  {
    title: '',
    color: 'blue',
    statusCall: CallStatus.DONE
  }
)

const loading = computed(() => props.statusCall === CallStatus.LOADING)
const loaded = computed(() => props.statusCall === CallStatus.DONE)
const error = computed(() => props.statusCall === CallStatus.FAILED)
</script>

<template>
  <div class="pokemon-detail-card" :color="color">
    <h4>{{ title }}</h4>
    <PkSpinner v-if="loading"></PkSpinner>
    <slot v-else-if="loaded"></slot>
    <p v-else-if="error">Service Error</p>
  </div>
</template>

<style scoped>
.pokemon-detail-card {
  position: relative;
  flex-grow: 1;
  background-color: white;
  padding: 1.5rem;
  border-top: 4px solid transparent;
  border-radius: 0.2rem;
  height: fit-content;
  width: 0;
  min-width: 15rem;
  min-height: 10rem;
}
.pokemon-detail-card[color='blue'] {
  border-top-color: var(--blue);
}

.pokemon-detail-card[color='red'] {
  border-top-color: var(--light-red);
}
h4 {
  font-size: 1.2rem;
  margin: 0 0 1em 0;
  font-weight: normal;
}
</style>
