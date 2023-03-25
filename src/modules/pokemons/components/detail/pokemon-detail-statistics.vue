<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getPokemonType } from '@/modules/pokemons/api/pokemons'
import type { PokemonType } from '@/modules/pokemons/api/pokemon-types'
import PokemonListTypeButton from '@/modules/pokemons/components/list/pokemon-type-button.vue'
import PkSpinner from '@/common/components/pk-spinner.vue'

const { t } = useI18n()
const props = defineProps<{ pokemonType: string }>()

const pokemonType = ref<null | PokemonType>(null)
const loadingFlag = ref(false)

watch(
  () => props.pokemonType,
  async () => {
    try {
      loadingFlag.value = true
      pokemonType.value = await getPokemonType(props.pokemonType)
    } finally {
      loadingFlag.value = false
    }
  },
  { immediate: true }
)

const vulnerableStatistics = computed(() => {
  if (!pokemonType.value) return []
  const { double_damage_from, half_damage_from } = pokemonType.value!.damage_relations
  return [
    ...double_damage_from.map(({ name }) => ({
      name,
      damage: 'double'
    })),
    ...half_damage_from.map(({ name }) => ({
      name,
      damage: 'half'
    }))
  ]
})
const resistanceStatistics = computed(() => {
  if (!pokemonType.value) return []
  const { double_damage_to, half_damage_to } = pokemonType.value!.damage_relations
  return [
    ...double_damage_to.map(({ name }) => ({
      name,
      damage: 'double'
    })),
    ...half_damage_to.map(({ name }) => ({
      name,
      damage: 'half'
    }))
  ]
})
</script>

<template>
  <div class="pokemon-detail-statistics">
    <PkSpinner v-if="loadingFlag"></PkSpinner>
    <div v-else class="pokemon-detail-statistics-body">
      <div>
        <h5>{{ t('Vulnerable_to') }}...</h5>
        <ul>
          <li v-for="vulnerability of vulnerableStatistics" :key="vulnerability.name">
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
          <li v-for="resistance of resistanceStatistics" :key="resistance.name">
            <PokemonListTypeButton :type="resistance.name"></PokemonListTypeButton>
            <p>
              <span>{{ resistance.damage }}</span>
              {{ t('damage') }}.
            </p>
          </li>
        </ul>
      </div>
    </div>
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
