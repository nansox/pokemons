import { CallStatus } from '@/common/store/types'
import type { Module } from 'vuex'
import type { Pokemon } from '@/modules/pokemons/api/pokemon-types'
import { getPokemonDetail } from '@/modules/pokemons/api/pokemons'

const state = {
  status: CallStatus.INITIAL,
  detail: null as Pokemon | null
}

const GetPokemonDetail = {
  namespaced: true,
  state,
  mutations: {
    setPokemon(state, newPokemon: Pokemon | null) {
      state.detail = newPokemon
    },
    changeStatus(state, newStatus: CallStatus) {
      state.status = newStatus
    }
  },
  getters: {
    statusCall: (state) => state.status,
    pokemonDetail: (state) => state.detail
  },
  actions: {
    async fetchPokemonDetail(context, name: string) {
      try {
        context.commit('changeStatus', CallStatus.LOADING)
        const result = await getPokemonDetail(name)
        context.commit('changeStatus', CallStatus.DONE)
        context.commit('setPokemon', result)
        return result
      } catch (error) {
        context.commit('changeStatus', CallStatus.FAILED)
        throw error
      }
    }
  }
} satisfies Module<typeof state, unknown>

export default GetPokemonDetail
