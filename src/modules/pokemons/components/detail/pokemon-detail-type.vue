<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import type { Pokemon } from '@/modules/pokemons/api/pokemon-types'
import PokemonListTypeButton from '@/modules/pokemons/components/list/pokemon-type-button.vue'
import PokemonDetailStatistics from '@/modules/pokemons/components/detail/pokemon-detail-statistics.vue'
import { useI18n } from 'vue-i18n'

const store = useStore()
const { t } = useI18n()

const pokemon = computed(() => store.getters['GetPokemonDetail/pokemonDetail'] as Pokemon)
const pokemonTypes = computed(() => pokemon.value.types.map(({ type }) => type.name))

const selectedType = ref(pokemonTypes.value[0])
</script>

<template>
  <div class="pokemon-detail-type">
    <h4>{{ t('Pokemon_type') }}</h4>
    <div class="types-buttons">
      <PokemonListTypeButton
        v-for="pokemonType in pokemonTypes"
        :key="pokemonType"
        :type="pokemonType"
        @click="selectedType = $event"
        :selected="selectedType === pokemonType"
      ></PokemonListTypeButton>
    </div>
    <PokemonDetailStatistics :pokemon-type="selectedType"></PokemonDetailStatistics>
  </div>
</template>

<style scoped>
.pokemon-detail-type {
  background-color: white;
  flex-grow: 1;
  padding-top: 1.5rem;
  border-top: 4px solid var(--blue);
  border-radius: 0.2rem;
  width: 0;
  min-width: 15rem;
  height: fit-content;
}
h4 {
  font-size: 1.2rem;
  margin: 0 0 1em 0;
  font-weight: normal;
  margin-left: 1.5rem;
}
.types-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 1.3rem;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.types-buttons button {
  padding: 0.5rem 2rem;
  font-size: 1rem;
}
.types-buttons button::first-letter {
  text-transform: capitalize;
}
</style>
