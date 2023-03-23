<script setup lang="ts">
import PkButton from '@/common/components/pk-button.vue'
import type { PokemonType } from '@/modules/pokemons/api/pokemon-types'
import { VariantByPokemonType } from '@/modules/pokemons/utils/pokemon-maps'
import { computed } from 'vue'

const props = defineProps<{ type: PokemonType }>()

const variant = computed(
  () => VariantByPokemonType[props.type.type.name as keyof typeof VariantByPokemonType]
)
</script>

<template>
  <PkButton :variant="variant">{{ type.type.name }}</PkButton>
</template>
