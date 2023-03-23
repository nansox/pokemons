<script setup lang="ts">
import PkButton from '@/common/components/pk-button.vue'
import PokemonListFilters from '@/modules/pokemons/components/pokemon-list-filters.vue'
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
onBeforeMount(() => store.dispatch('fetchPokemons'))

const pokemons = computed(() => store.getters['pokemonList'])
</script>

<template>
  <div class="pokemons-list">
    <PokemonListFilters />
    <h1>Pokemons list page</h1>
    <PkButton>Test</PkButton>
    {{ pokemons }}
  </div>
</template>

<style scoped>
.pokemons-list {
  box-sizing: border-box;
  height: 100%;
  background-color: var(--light-grey);
  padding: 4rem;
}
</style>
