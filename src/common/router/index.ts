import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pokemons',
      component: () => import('@/modules/pokemons/views/PokemonListView.vue')
    },
    {
      path: '/:name',
      name: 'pokemon-detail',
      component: () => import('@/modules/pokemons/views/PokemonDetailView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
