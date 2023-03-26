<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import type { Pokemon } from '@/modules/pokemons/api/pokemon-types'
import PokemonListTypeButton from '@/modules/pokemons/components/pokemon-type-button.vue'
import PokemonDetailStatistics from '@/modules/pokemons/components/detail/type-card/pokemon-detail-statistics.vue'
import PokemonDetailCard from '@/modules/pokemons/components/detail/pokemon-detail-card.vue'

const store = useStore()
const { t } = useI18n()

const pokemon = computed(() => store.getters['GetPokemonDetail/pokemonDetail'] as Pokemon)
const pokemonTypes = computed(() => pokemon.value.types.map(({ type }) => type.name))

const selectedType = ref(pokemonTypes.value[0])
</script>

<template>
  <PokemonDetailCard color="blue" :title="t('Pokemon_type')">
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
  </PokemonDetailCard>
</template>

<style scoped>
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
