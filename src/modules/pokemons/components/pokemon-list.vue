<script setup lang="ts">
import type { Pokemon } from '@/modules/pokemons/api/pokemon-types'
import PokemonListCard from '@/modules/pokemons/components/pokemon-list-card.vue'

defineProps<{ pokemons: Pokemon[] }>()
</script>

<template>
  <ul>
    <PokemonListCard
      v-for="(pokemon, index) in pokemons"
      :key="pokemon.name"
      :pokemon="pokemon"
      :index="index"
    ></PokemonListCard>
  </ul>
</template>

<style scoped>
ul {
  display: grid;
  gap: 0.3rem;
  row-gap: 1.2rem;
  min-height: 0;
  padding: 0.8rem 1.2rem;
  overflow: auto;
  background-color: var(--grey-300);
  justify-items: center;
  align-items: center;
}
@media (min-width: 860px) {
  ul {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1200px) {
  ul {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
