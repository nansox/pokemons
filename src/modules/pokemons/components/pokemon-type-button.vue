<script setup lang="ts">
import PkButton from '@/common/components/pk-button.vue'
import { VariantByPokemonType } from '@/modules/pokemons/utils/pokemon-maps'
import { computed } from 'vue'

const props = withDefaults(defineProps<{ type: string; selected?: boolean }>(), {
  selected: false
})
const emit = defineEmits<{
  (event: 'click', type: string): void
}>()

const variant = computed(
  () => VariantByPokemonType[props.type as keyof typeof VariantByPokemonType]
)
</script>

<template>
  <PkButton :variant="variant" @click="emit('click', type)" :class="{ ['selected']: selected }">{{
    type
  }}</PkButton>
</template>
<style>
button.selected {
  border-bottom: 5px solid var(--light-black);
}
</style>
