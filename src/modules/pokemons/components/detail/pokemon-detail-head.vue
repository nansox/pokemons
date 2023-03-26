<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import type { Pokemon } from '@/modules/pokemons/api/pokemon-types'
import IconGoBack from '@/common/components/icons/IconGoBack.vue'
import PkButton from '@/common/components/pk-button.vue'

const store = useStore()
const pokemon = computed(() => store.getters['GetPokemonDetail/pokemonDetail'] as Pokemon)
</script>

<template>
  <section class="pokemon-detail-view-head">
    <div class="pokemon-detail-view-go-back">
      <RouterLink :to="{ name: 'pokemons' }">
        <PkButton>
          <IconGoBack></IconGoBack>
        </PkButton>
      </RouterLink>
    </div>
    <div class="pokemon-detail-view-main">
      <img :src="pokemon.sprites.front_default" />
      <h3>{{ pokemon.name }}</h3>
    </div>
  </section>
</template>

<style scoped>
.pokemon-detail-view-head {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.pokemon-detail-view-go-back {
  padding: 1rem;
}
.pokemon-detail-view-go-back svg {
  height: 2rem;
  width: 2rem;
  fill: white;
}
.pokemon-detail-view-main {
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
</style>
