import { createStore } from 'vuex'
import GetPokemons from '@/modules/pokemons/store/get-pokemons-store'

const store = createStore({
  modules: { GetPokemons }
})

export { store }
