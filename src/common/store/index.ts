import { createStore } from 'vuex'
import GetPokemons from '@/modules/pokemons/store/get-pokemons-store'
import GetPokemonDetail from '@/modules/pokemons/store/get-pokemon-detail-store'
import GetPokemonStatistics from '@/modules/pokemons/store/get-pokemon-statistics'
import GetPokemonAbility from '@/modules/pokemons/store/get-pokemon-ability'

const store = createStore({
  modules: { GetPokemons, GetPokemonDetail, GetPokemonStatistics, GetPokemonAbility }
})

export { store }
