import { CallStatus } from '@/common/store/types'
import type { Module } from 'vuex'
import type { PokemonType } from '@/modules/pokemons/api/pokemon-types'
import { getPokemonType } from '@/modules/pokemons/api/pokemons'

const state = {
  status: CallStatus.INITIAL,
  type: null as PokemonType | null
}

const GetPokemonStatistics = {
  namespaced: true,
  state,
  mutations: {
    setPokemonType(state, newPokemonType: PokemonType | null) {
      state.type = newPokemonType
    },
    changeStatus(state, newStatus: CallStatus) {
      state.status = newStatus
    }
  },
  getters: {
    statusCall: (state) => state.status,
    vulnerableStatistics: (state) => {
      if (!state.type) return []
      const { double_damage_from, half_damage_from } = state.type.damage_relations
      return [
        ...double_damage_from.map(({ name }) => ({
          name,
          damage: 'double'
        })),
        ...half_damage_from.map(({ name }) => ({
          name,
          damage: 'half'
        }))
      ]
    },
    resistanceStatistics: (state) => {
      if (!state.type) return []
      const { double_damage_to, half_damage_to } = state.type!.damage_relations
      return [
        ...double_damage_to.map(({ name }) => ({
          name,
          damage: 'double'
        })),
        ...half_damage_to.map(({ name }) => ({
          name,
          damage: 'half'
        }))
      ]
    }
  },
  actions: {
    clean(context) {
      context.commit('changeStatus', CallStatus.INITIAL)
      context.commit('setPokemonType', null)
    },
    async fetchPokemonStatistics(context, type: string) {
      try {
        context.commit('changeStatus', CallStatus.LOADING)
        const result = await getPokemonType(type)
        context.commit('changeStatus', CallStatus.DONE)
        context.commit('setPokemonType', result)
        return result
      } catch (error) {
        context.commit('changeStatus', CallStatus.FAILED)
        throw error
      }
    }
  }
} satisfies Module<typeof state, unknown>

export default GetPokemonStatistics
