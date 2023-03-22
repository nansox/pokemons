<script setup lang="ts">
import PkSearchInput from '@/common/components/pk-search-input.vue'
import PkSelect from '@/common/components/pk-select.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="pokemons-list-filters">
    <PkSearchInput :placeholder="t('Search_a_Pokemon')" />
    <PkSelect :placeholder="t('Select_a_Category')" :options="{ hola: 'Hola', adios: 'Adios' }" />
  </div>
</template>

<style scoped>
.pokemons-list-filters {
  display: flex;
  justify-content: space-between;
}
</style>
