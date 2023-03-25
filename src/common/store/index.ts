import { createStore } from 'vuex'
import GetPokemons from '@/modules/pokemons/store/get-pokemons-store'
import GetPokemonDetail from '@/modules/pokemons/store/get-pokemon-detail-store'
import GetPokemonStatistics from '@/modules/pokemons/store/get-pokemon-statistics'

const store = createStore({
  modules: { GetPokemons, GetPokemonDetail, GetPokemonStatistics }
})

export { store }
