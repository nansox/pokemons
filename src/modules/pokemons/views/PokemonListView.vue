<script setup lang="ts">
import PkButton from '../../../common/components/pk-button.vue'
</script>

<template>
  <div class="pokemons-list">
    <h1>Pokemons list page</h1>
    <PkButton>Test</PkButton>
  </div>
</template>

<style scoped>
.pokemons-list {
  height: 100%;
  background-color: var(--light-grey);
  padding: 4rem;
}
</style>
