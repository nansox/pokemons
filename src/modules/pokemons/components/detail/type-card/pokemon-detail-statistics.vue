<script setup lang="ts">
import { useStore } from 'vuex'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { onBeforeRouteLeave } from 'vue-router'
import PkSpinner from '@/common/components/pk-spinner.vue'
import { CallStatus } from '@/common/store/types'
import PokemonStatisticList from '@/modules/pokemons/components/detail/type-card/pokemon-statistic-list.vue'

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
      <PokemonStatisticList color="red" :list="vulnerabilities" :title="t('Vulnerable_to')" />
      <PokemonStatisticList color="green" :list="resistances" :title="t('Resistant_to')" />
    </div>
    <p v-else-if="error">Service Error</p>
  </div>
</template>

<style scoped>
.pokemon-detail-statistics {
  position: relative;
  min-height: 5rem;
}
.pokemon-detail-statistics-body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
