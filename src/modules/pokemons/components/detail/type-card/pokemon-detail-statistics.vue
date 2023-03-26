<script setup lang="ts">
import { useStore } from 'vuex'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { onBeforeRouteLeave } from 'vue-router'
import PokemonListTypeButton from '@/modules/pokemons/components/pokemon-type-button.vue'
import PkSpinner from '@/common/components/pk-spinner.vue'
import { CallStatus } from '@/common/store/types'

const { t } = useI18n()
const store = useStore()
const props = defineProps<{ pokemonType: string }>()

const loading = computed(
  () => store.getters['GetPokemonStatistics/statusCall'] === CallStatus.LOADING
)
const loaded = computed(() => store.getters['GetPokemonStatistics/statusCall'] === CallStatus.DONE)
const error = computed(() => store.getters['GetPokemonStatistics/statusCall'] === CallStatus.FAILED)

const vulnerabilities = computed(() => store.getters['GetPokemonStatistics/vulnerableStatistics'])
const resistances = computed(() => store.getters['GetPokemonStatistics/resistanceStatistics'])

watch(
  () => props.pokemonType,
  () => store.dispatch('GetPokemonStatistics/fetchPokemonStatistics', props.pokemonType),
  { immediate: true }
)

onBeforeRouteLeave(() => store.dispatch('GetPokemonStatistics/clean'))
</script>

<template>
  <div class="pokemon-detail-statistics">
    <PkSpinner v-if="loading"></PkSpinner>
    <div v-else-if="loaded" class="pokemon-detail-statistics-body">
      <div>
        <h5>{{ t('Vulnerable_to') }}...</h5>
        <ul>
          <li v-for="vulnerability of vulnerabilities" :key="vulnerability.name">
            <PokemonListTypeButton :type="vulnerability.name"></PokemonListTypeButton>
            <p>
              <span>{{ vulnerability.damage }}</span>
              {{ t('damage') }}.
            </p>
          </li>
        </ul>
      </div>
      <div>
        <h5>{{ t('Resistant_to') }}...</h5>
        <ul>
          <li v-for="resistance of resistances" :key="resistance.name">
            <PokemonListTypeButton :type="resistance.name"></PokemonListTypeButton>
            <p>
              <span>{{ resistance.damage }}</span>
              {{ t('damage') }}.
            </p>
          </li>
        </ul>
      </div>
    </div>
    <p v-else-if="error">Service Error</p>
  </div>
</template>

<style scoped>
.pokemon-detail-statistics {
  position: relative;
  min-height: 13rem;
}
.pokemon-detail-statistics-body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.pokemon-detail-statistics-body > div {
  display: flex;
  flex-direction: column;
  align-items: center;
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
.pokemon-detail-statistics-body > div:first-child span {
  color: var(--red);
}
.pokemon-detail-statistics-body > div:last-child span {
  color: var(--green);
}
</style>
