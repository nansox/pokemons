<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { CallStatus } from '@/common/store/types'
import PkSpinner from '@/common/components/pk-spinner.vue'
import PokemonDetailType from '@/modules/pokemons/components/detail/pokemon-detail-type.vue'
import type { Pokemon } from '@/modules/pokemons/api/pokemon-types'
import PokemonBestMoves from '@/modules/pokemons/components/detail/pokemon-best-moves.vue'

const store = useStore()
const route = useRoute()

onBeforeMount(async () => {
  await store.dispatch('fetchPokemonDetail', route.params.name)
})
const pokemon = computed(() => store.getters.pokemonDetail as Pokemon)
const detailCallStatus = computed(() => store.getters.pokemonDetailStatusCall)
const loading = computed(() => detailCallStatus.value === CallStatus.LOADING)
const loaded = computed(() => detailCallStatus.value === CallStatus.DONE)
</script>

<template>
  <PkSpinner v-if="loading"></PkSpinner>
  <section v-else-if="loaded" class="pokemon-detail-view">
    <div class="pokemon-detail-view-head">
      <img :src="pokemon.sprites.front_default" />
      <h3>{{ pokemon.name }}</h3>
    </div>
    <div class="pokemon-detail-view-body">
      <PokemonDetailType></PokemonDetailType>
      <PokemonBestMoves></PokemonBestMoves>
    </div>
  </section>
  <p v-else>Service Error</p>
</template>

<style scoped>
.pokemon-detail-view {
  position: relative;
  height: 100%;
  background-color: var(--light-grey);
  padding-top: 3rem;
  box-sizing: border-box;
}
.pokemon-detail-view-head {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}
h3 {
  font-size: 1.5rem;
  font-weight: normal;
}
h3::first-letter {
  text-transform: capitalize;
}
.pokemon-detail-view-body {
  padding: 0 1rem;
  display: flex;
  gap: 1.5rem;
}
</style>
