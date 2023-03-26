<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import type { Pokemon, PokemonAbility } from '@/modules/pokemons/api/pokemon-types'
import { onBeforeRouteLeave } from 'vue-router'
import PokemonMovesList from '@/modules/pokemons/components/detail/moves-card/pokemon-moves-list.vue'
import PokemonDetailCard from '@/modules/pokemons/components/detail/pokemon-detail-card.vue'

const store = useStore()
const { t } = useI18n()

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
  <PokemonDetailCard
    color="red"
    :title="t('Best_moveset_for', { name: pokemon.name })"
    :status-call="store.getters['GetPokemonAbility/statusCall']"
  >
    <p>{{ Message }}</p>
    <PokemonMovesList :moves-list="pokemon.moves"></PokemonMovesList>
  </PokemonDetailCard>
</template>
