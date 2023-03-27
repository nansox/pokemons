import { describe, it, expect, vitest, beforeAll, vi } from 'vitest'
vi.mock('@/modules/pokemons/components/list/pokemon-list-filters.vue', () => ({
  default: defineComponent({ template: '<div id="filters"></div>' })
}))
vi.mock('@/common/components/pk-spinner.vue', () => ({
  default: defineComponent({ template: '<div id="spinner"></div>' })
}))
vi.mock('@/modules/pokemons/components/list/pokemon-list.vue', () => ({
  default: defineComponent({ template: '<div id="list"></div>', props: { pokemons: Array } })
}))
vi.mock('vue-router', () => ({
  onBeforeRouteLeave: vitest.fn()
}))

import { mount } from '@vue/test-utils'
import { CallStatus } from '@/common/store/types'
import { createStore, type Module } from 'vuex'
import { defineComponent, nextTick } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import PokemonListView from '@/modules/pokemons/views/PokemonListView.vue'
import PokemonList from '@/modules/pokemons/components/list/pokemon-list.vue'

const GetPokemons = {
  namespaced: true,
  state: {
    list: null,
    status: CallStatus.INITIAL
  },
  getters: {
    filteredList: (state) => state.list,
    statusCall: (state) => state.status
  },
  actions: { fetchPokemons: vitest.fn(), clean: vitest.fn() }
} satisfies Module<any, unknown>

const fakeStore = createStore<any>({ modules: { GetPokemons } })

let wrapper: any

describe('PokemonListView', () => {
  beforeAll(() => {
    wrapper = mount(PokemonListView, {
      global: {
        provide: {
          store: fakeStore
        }
      }
    })
  })
  it('call to fetchPokemons when mount', () => {
    expect(GetPokemons.actions.fetchPokemons).toHaveBeenCalledOnce()
    expect(wrapper.find('#filters').exists()).toBeTruthy()
    expect(wrapper.find('p').exists()).toBeFalsy()
  })

  it('show spinner while call status loading', async () => {
    fakeStore.state.GetPokemons.status = CallStatus.LOADING
    await nextTick()
    expect(wrapper.find('#spinner').exists()).toBeTruthy()
    expect(wrapper.find('#list').exists()).toBeFalsy()
    expect(wrapper.find('p').exists()).toBeFalsy()
  })

  it('show content when call status success', async () => {
    fakeStore.state.GetPokemons.status = CallStatus.DONE
    fakeStore.state.GetPokemons.list = ['listContent']
    await nextTick()
    expect(wrapper.find('#spinner').exists()).toBeFalsy()
    expect(wrapper.find('p').exists()).toBeFalsy()
    expect(wrapper.findComponent(PokemonList).exists()).toBeTruthy()
    expect(wrapper.getComponent(PokemonList).props()).toEqual({
      pokemons: ['listContent']
    })
  })

  it('show error when call status failed', async () => {
    fakeStore.state.GetPokemons.status = CallStatus.FAILED

    await nextTick()
    expect(wrapper.find('#spinner').exists()).toBeFalsy()
    expect(wrapper.findComponent(PokemonList).exists()).toBeFalsy()
    expect(wrapper.find('p').exists()).toBeTruthy()
  })

  it('clean store module on route leave', async () => {
    fakeStore.state.GetPokemons.status = CallStatus.FAILED

    await nextTick()
    expect(GetPokemons.actions.clean).not.toHaveBeenCalled()
    ;(onBeforeRouteLeave as any).mock.lastCall[0]()
    expect(GetPokemons.actions.clean).toHaveBeenCalledOnce()
  })
})
