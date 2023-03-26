<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { CallStatus } from '@/common/store/types'
import PkSpinner from '@/common/components/pk-spinner.vue'
import PokemonDetailType from '@/modules/pokemons/components/detail/type-card/pokemon-detail-type.vue'
import PokemonBestMoves from '@/modules/pokemons/components/detail/moves-card/pokemon-best-moves.vue'
import PokemonDetailHead from '@/modules/pokemons/components/detail/pokemon-detail-head.vue'

const store = useStore()
const route = useRoute()

onBeforeMount(async () => {
  await store.dispatch('GetPokemonDetail/fetchPokemonDetail', route.params.name)
})
const detailCallStatus = computed(() => store.getters['GetPokemonDetail/statusCall'])
const loading = computed(() => detailCallStatus.value === CallStatus.LOADING)
const loaded = computed(() => detailCallStatus.value === CallStatus.DONE)
const error = computed(() => detailCallStatus.value === CallStatus.FAILED)

onBeforeRouteLeave(() => store.dispatch('GetPokemonDetail/clean'))
</script>

<template>
  <PkSpinner v-if="loading"></PkSpinner>
  <section v-else-if="loaded" class="pokemon-detail-view">
    <PokemonDetailHead></PokemonDetailHead>
    <div class="pokemon-detail-view-body">
      <PokemonDetailType></PokemonDetailType>
      <PokemonBestMoves></PokemonBestMoves>
    </div>
  </section>
  <p v-else-if="error">Service Error</p>
</template>

<style scoped>
.pokemon-detail-view {
  position: relative;
  height: 100%;
  background-color: var(--light-grey);
  box-sizing: border-box;
  overflow: auto;
  padding-bottom: 1rem;
}
.pokemon-detail-view-body {
  padding: 0 1rem;
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}
</style>
