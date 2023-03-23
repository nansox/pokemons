import { CallStatus } from '@/common/store/types'
import type { Module } from 'vuex'
import type { Pokemon } from '@/modules/pokemons/api/pokemon-types'
import { getPokemonDetail, getPokemonsList } from '@/modules/pokemons/api/pokemons'

const state = {
  status: CallStatus.INITIAL,
  list: null as Pokemon[] | null
}

const GetPokemons = {
  state,
  mutations: {
    setList(state, newList: Pokemon[] | null) {
      state.list = newList
    },
    changeStatus(state, newStatus: CallStatus) {
      state.status = newStatus
    }
  },
  getters: {
    statusCall: (state) => state.status,
    pokemonList: (state) => state.list
  },
  actions: {
    async fetchPokemons(context) {
      try {
        context.commit('changeStatus', CallStatus.LOADING)
        const result = await getPokemonsCallProcess()
        context.commit('changeStatus', CallStatus.DONE)
        context.commit('setList', result)
        return result
      } catch (error) {
        context.commit('changeStatus', CallStatus.FAILED)
        throw error
      }
    }
  }
} satisfies Module<typeof state, unknown>

export default GetPokemons

async function getPokemonsCallProcess() {
  const { results } = await getPokemonsList()

  const list = [] as Pokemon[]
  for (const { name } of results) list.push(await getPokemonDetail(name))

  return list
}
