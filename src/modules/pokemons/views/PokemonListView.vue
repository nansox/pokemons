<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import PokemonListFilters from '@/modules/pokemons/components/list/pokemon-list-filters.vue'
import { CallStatus } from '@/common/store/types'
import PkSpinner from '@/common/components/pk-spinner.vue'
import PokemonList from '@/modules/pokemons/components/list/pokemon-list.vue'
import { onBeforeRouteLeave } from 'vue-router'

const store = useStore()
onBeforeMount(() => store.dispatch('GetPokemons/fetchPokemons'))

const pokemons = computed(() => store.getters['GetPokemons/filteredList'])
const statusCall = computed(() => store.getters['GetPokemons/statusCall'])
const loading = computed(() => statusCall.value === CallStatus.LOADING)
const loaded = computed(() => statusCall.value === CallStatus.DONE)

onBeforeRouteLeave(() => store.dispatch('GetPokemons/clean'))
</script>

<template>
  <div class="pokemons-list">
    <PokemonListFilters />
    <PkSpinner v-if="loading"></PkSpinner>
    <PokemonList v-else-if="loaded" :pokemons="pokemons"></PokemonList>
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
  position: relative;
}
</style>
