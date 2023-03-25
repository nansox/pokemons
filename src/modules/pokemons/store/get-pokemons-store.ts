import { CallStatus } from '@/common/store/types'
import type { Module } from 'vuex'
import type { Pokemon } from '@/modules/pokemons/api/pokemon-types'
import { getPokemonDetail, getPokemonsList } from '@/modules/pokemons/api/pokemons'

const state = {
  status: CallStatus.INITIAL,
  list: null as Pokemon[] | null,
  filters: { name: '', category: '' }
}

const GetPokemons = {
  state,
  mutations: {
    setList(state, newList: Pokemon[] | null) {
      state.list = newList
    },
    changeStatus(state, newStatus: CallStatus) {
      state.status = newStatus
    },
    setFilter(state, { filter, newVal }: { filter: 'name' | 'category'; newVal: string }) {
      state.filters[filter] = newVal
    }
  },
  getters: {
    pokemonListStatusCall: (state) => state.status,
    pokemonList: (state) => state.list,
    pokemonsNameFilter: (state) => state.filters.name,
    pokemonsCategoryFilter: (state) => state.filters.category,
    pokemonFilteredList: (state) =>
      state.list?.filter((pok) => {
        const nameCondition =
          state.filters.name === '' || pok.name.toLowerCase() === state.filters.name.toLowerCase()
        const categoryCondition =
          state.filters.category === '' ||
          pok.types.map(({ type }) => type.name).includes(state.filters.category)

        return nameCondition && categoryCondition
      })
  },
  actions: {
    updateFilter(context, payload: { filter: 'name' | 'category'; newVal: string }) {
      context.commit('setFilter', payload)
    },
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
