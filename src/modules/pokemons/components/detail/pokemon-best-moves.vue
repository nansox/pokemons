<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import type { Pokemon, PokemonAbility } from '@/modules/pokemons/api/pokemon-types'
import PkSpinner from '@/common/components/pk-spinner.vue'
import { CallStatus } from '@/common/store/types'
import { onBeforeRouteLeave } from 'vue-router'
import PokemonMovesList from './pokemon-moves-list.vue'

const store = useStore()
const { t } = useI18n()

const loading = computed(() => store.getters['GetPokemonAbility/statusCall'] === CallStatus.LOADING)
const loaded = computed(() => store.getters['GetPokemonAbility/statusCall'] === CallStatus.DONE)
const pokemon = computed(() => store.getters['GetPokemonDetail/pokemonDetail'] as Pokemon)
const abilityName = computed(() => pokemon.value.abilities[0].ability.name)
const Ability = computed(() => store.getters['GetPokemonAbility/ability'] as PokemonAbility)
const Message = computed(
  () => Ability.value.effect_entries.find(({ language }) => language.name === 'en')?.effect
)

onBeforeMount(() => store.dispatch('GetPokemonAbility/fetchPokemonAbility', abilityName.value))
onBeforeRouteLeave(() => store.dispatch('GetPokemonAbility/clean'))
</script>

<template>
  <div class="pokemon-best-moves-container">
    <PkSpinner v-if="loading"></PkSpinner>
    <div v-else-if="loaded" class="pokemon-best-moves">
      <h4>{{ t('Best_moveset_for', { name: pokemon.name }) }}</h4>
      <p>{{ Message }}</p>
      <PokemonMovesList :moves-list="pokemon.moves"></PokemonMovesList>
    </div>
    <p v-else>Service Error</p>
  </div>
</template>

<style scoped>
.pokemon-best-moves-container {
  position: relative;
  flex-grow: 1;
  background-color: white;
  padding: 1.5rem;
  border-top: 4px solid var(--light-red);
  border-radius: 0.2rem;
  height: fit-content;
  width: 0;
  min-width: 15rem;
  min-height: 10rem;
}
h4 {
  font-size: 1.2rem;
  margin: 0 0 1em 0;
  font-weight: normal;
}
</style>
