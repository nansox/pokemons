import { createStore } from 'vuex'
import GetPokemons from '@/modules/pokemons/store/get-pokemons-store'
import GetPokemonDetail from '@/modules/pokemons/store/get-pokemon-detail-store'

const store = createStore({
  modules: { GetPokemons, GetPokemonDetail }
})

export { store }
