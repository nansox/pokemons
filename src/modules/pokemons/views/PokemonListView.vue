<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import PokemonListFilters from '@/modules/pokemons/components/pokemon-list-filters.vue'
import { CallStatus } from '@/common/store/types'
import PkSpinner from '@/common/components/pk-spinner.vue'
import PokemonList from '@/modules/pokemons/components/pokemon-list.vue'

const store = useStore()
onBeforeMount(() => store.dispatch('fetchPokemons'))

const pokemons = computed(() => store.getters['pokemonFilteredList'])
const statusCall = computed(() => store.getters['pokemonStatusCall'])
const loading = computed(() => statusCall.value === CallStatus.LOADING)
const success = computed(() => statusCall.value === CallStatus.DONE)
</script>

<template>
  <div class="pokemons-list">
    <PokemonListFilters />
    <PkSpinner v-if="loading"></PkSpinner>
    <PokemonList v-else-if="success" :pokemons="pokemons"></PokemonList>
    <p v-else>Service Error</p>
  </div>
</template>

<style scoped>
.pokemons-list {
  box-sizing: border-box;
  height: 100%;
  background-color: var(--light-grey);
  padding: 2rem 4rem;
  gap: 2rem;
  display: flex;
  flex-direction: column;
}
</style>
