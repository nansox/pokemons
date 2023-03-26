<script setup lang="ts">
import type { PokemonMove } from '@/modules/pokemons/api/pokemon-types'
import { computed } from 'vue'
import SheetIcon from '@/common/components/icons/SheetIcon.vue'

const props = defineProps<{ movesList: PokemonMove[] }>()

const formattedMoves = computed(() =>
  props.movesList.slice(0, 4).map(({ move }) => move.name.replace('-', ' '))
)
</script>

<template>
  <div class="pokemon-moves-list">
    <div v-for="move in formattedMoves" :key="move">
      <SheetIcon></SheetIcon>
      <span>
        {{ move }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.pokemon-moves-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
.pokemon-moves-list > div {
  background-color: var(--transparent-green);
  padding: 0.5rem;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}
.pokemon-moves-list > div svg {
  width: 1rem;
  height: 1rem;
  background-color: var(--green);
  border-radius: 50%;
  padding: 0.2rem;
}
.pokemon-moves-list > div::first-letter {
  text-transform: capitalize;
}
</style>
