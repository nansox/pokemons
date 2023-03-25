<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import type { Pokemon } from '@/modules/pokemons/api/pokemon-types'

const store = useStore()
const { t } = useI18n()

const pokemon = computed(() => store.getters.pokemonDetail as Pokemon)
</script>

<template>
  <div class="pokemon-best-moves">
    <h4>{{ t('Best_moveset_for', { name: pokemon.name }) }}</h4>
  </div>
</template>

<style scoped>
.pokemon-best-moves {
  flex-grow: 1;
  background-color: white;
  padding: 1.5rem;
  border-top: 4px solid var(--light-red);
  border-radius: 0.2rem;
  width: 0;
}
h4 {
  font-size: 1.2rem;
  margin: 0 0 1em 0;
  font-weight: normal;
}
</style>
