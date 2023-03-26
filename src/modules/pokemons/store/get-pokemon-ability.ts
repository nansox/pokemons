import { CallStatus } from '@/common/store/types'
import type { Module } from 'vuex'
import type { PokemonAbility } from '@/modules/pokemons/api/pokemon-types'
import { getPokemonAbility } from '@/modules/pokemons/api/pokemons'

const state = {
  status: CallStatus.INITIAL,
  ability: null as PokemonAbility | null
}

const GetPokemonAbility = {
  namespaced: true,
  state,
  mutations: {
    setAbility(state, newPokemonAbility: PokemonAbility | null) {
      state.ability = newPokemonAbility
    },
    changeStatus(state, newStatus: CallStatus) {
      state.status = newStatus
    }
  },
  getters: {
    statusCall: (state) => state.status,
    ability: (state) => state.ability
  },
  actions: {
    clean(context) {
      context.commit('changeStatus', CallStatus.INITIAL)
      context.commit('setAbility', null)
    },
    async fetchPokemonAbility(context, name: string) {
      try {
        context.commit('changeStatus', CallStatus.LOADING)
        const result = await getPokemonAbility(name)
        context.commit('changeStatus', CallStatus.DONE)
        context.commit('setAbility', result)
        return result
      } catch (error) {
        context.commit('changeStatus', CallStatus.FAILED)
        throw error
      }
    }
  }
} satisfies Module<typeof state, unknown>

export default GetPokemonAbility
