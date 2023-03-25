<script setup lang="ts">
import PkSearchInput from '@/common/components/pk-search-input.vue'
import PkSelect from '@/common/components/pk-select.vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { VariantByPokemonType } from '@/modules/pokemons/utils/pokemon-maps'

const { t } = useI18n()
const store = useStore()

const selectOptions = Object.keys(VariantByPokemonType).reduce((acumm, opt) => {
  acumm[opt] = opt
  return acumm
}, {} as { [key: string]: string })

const textVModel = ref('')

const categoryVModel = computed({
  get: () => store.getters['GetPokemons/categoryFilter'],
  set: (nVal: string) =>
    store.dispatch('GetPokemons/updateFilter', { filter: 'category', newVal: nVal })
})

const doSearch = (text: string) =>
  store.dispatch('GetPokemons/updateFilter', { filter: 'name', newVal: text })
</script>

<template>
  <div class="pokemons-list-filters">
    <PkSearchInput
      :placeholder="t('Search_a_Pokemon')"
      v-model:value="textVModel"
      @search="doSearch"
    />
    <PkSelect
      :placeholder="t('Select_a_Category')"
      :options="selectOptions"
      v-model:value="categoryVModel"
    />
  </div>
</template>

<style scoped>
.pokemons-list-filters {
  display: flex;
  justify-content: space-between;
}
</style>
