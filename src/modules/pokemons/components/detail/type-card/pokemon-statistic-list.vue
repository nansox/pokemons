<script setup lang="ts">
import PokemonListTypeButton from '@/modules/pokemons/components/pokemon-type-button.vue'
import { useI18n } from 'vue-i18n'

defineProps<{
  color: 'red' | 'green'
  title: string
  list: {
    name: string
    damage: string
  }[]
}>()

const { t } = useI18n()
</script>

<template>
  <div :color="color">
    <h5>{{ title }}...</h5>
    <ul>
      <li v-for="statistic of list" :key="statistic.name">
        <PokemonListTypeButton :type="statistic.name"></PokemonListTypeButton>
        <p>
          <span>{{ statistic.damage }}</span>
          {{ t('damage') }}.
        </p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
div[color='red'] span {
  color: var(--red);
}
div[color='green'] span {
  color: var(--green);
}
h5 {
  margin: 0;
  font-size: 1em;
  font-weight: normal;
}

ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin: 1rem 0;
  padding: 0;
}
li {
  display: flex;
  gap: 1rem;
}
li button {
  width: 5rem;
  padding: 0.3em;
}
li p {
  margin: 0;
}
li span {
  font-weight: 600;
}
</style>
