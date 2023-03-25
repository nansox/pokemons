<script setup lang="ts">
import type { Pokemon } from '@/modules/pokemons/api/pokemon-types'
import PokemonListTypeButton from '@/modules/pokemons/components/list/pokemon-type-button.vue'

const props = defineProps<{ pokemon: Pokemon; index: number }>()
</script>

<template>
  <RouterLink :to="{ name: 'pokemon-detail', params: { name: props.pokemon.name } }">
    <div class="content">
      <div class="data-container">
        <h3>{{ pokemon.name }}</h3>
        <div class="types-container">
          <PokemonListTypeButton
            v-for="pokemonType in pokemon.types"
            :key="pokemonType.type.name"
            :type="pokemonType.type.name"
          ></PokemonListTypeButton>
        </div>
      </div>
      <div class="img-container">
        <img :src="pokemon.sprites.front_default" />
        <span>#{{ index + 1 }}</span>
      </div>
    </div>
    <div class="bottom-bar-container">
      <div class="bottom-bar" :style="{ width: `${props.pokemon.base_experience / 3}%` }"></div>
    </div>
  </RouterLink>
</template>

<style scoped>
a {
  background-color: white;
  width: 20rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 0.3rem;
  text-decoration: none;
}
.content {
  flex-grow: 1;
  display: flex;
  align-items: stretch;
}
.data-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
}
.data-container h3 {
  color: var(--light-blue);
}
.data-container h3::first-letter {
  text-transform: capitalize;
}
.types-container {
  display: flex;
  gap: 0.1rem;
}
.img-container {
  position: relative;
  padding-right: 0.4rem;
}
.img-container > span {
  position: absolute;
  right: 3px;
  top: 3px;
  color: var(--grey);
  font-size: 0.8rem;
}
.bottom-bar-container {
  background-color: var(--light-grey);
  height: 0.3rem;

  border-bottom-left-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
  overflow: hidden;
}
.bottom-bar {
  height: 100%;
  background-color: var(--blue);
}
</style>
