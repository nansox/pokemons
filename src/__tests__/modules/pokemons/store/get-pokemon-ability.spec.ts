vi.mock('@/modules/pokemons/api/pokemons', () => ({
  getPokemonAbility: vitest.fn()
}))

import { CallStatus } from '@/common/store/types'
import GetPokemonAbility from '@/modules/pokemons/store/get-pokemon-ability'
import { describe, it, expect, vitest, vi, beforeEach } from 'vitest'
import { createStore } from 'vuex'
import { getPokemonAbility } from '@/modules/pokemons/api/pokemons'

const createVuexStore = () =>
  createStore<any>({
    modules: { GetPokemonAbility }
  })

describe('get-pokemon-ability', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
  })
  it('check initial values', () => {
    const store = createVuexStore()
    expect(store.state.GetPokemonAbility.status).toEqual(CallStatus.INITIAL)
    expect(store.state.GetPokemonAbility.ability).toEqual(null)
  })
  it('check mutations', () => {
    const store = createVuexStore()
    store.commit('GetPokemonAbility/setAbility', { key1: 'data1' })
    store.commit('GetPokemonAbility/changeStatus', CallStatus.FAILED)
    expect(store.state.GetPokemonAbility.status).toEqual(CallStatus.FAILED)
    expect(store.state.GetPokemonAbility.ability).toEqual({ key1: 'data1' })
  })
  it('check getters', () => {
    const store = createVuexStore()
    store.state.GetPokemonAbility.status = CallStatus.LOADING
    store.state.GetPokemonAbility.ability = { test: 'test1' }
    expect(store.getters['GetPokemonAbility/statusCall']).toEqual(CallStatus.LOADING)
    expect(store.getters['GetPokemonAbility/ability']).toEqual({ test: 'test1' })
  })

  it('fetchPokemonAbility action success', async () => {
    const store = createVuexStore()
    let promiseResolve: any
    const fakePromise = new Promise((resolve) => (promiseResolve = resolve))
    ;(getPokemonAbility as any).mockResolvedValueOnce(fakePromise)
    store.dispatch('GetPokemonAbility/fetchPokemonAbility')
    await new Promise((r) => setTimeout(r))
    expect(store.state.GetPokemonAbility.status).toEqual(CallStatus.LOADING)
    promiseResolve({ key1: 'result' })
    await new Promise((r) => setTimeout(r))
    expect(store.state.GetPokemonAbility.status).toEqual(CallStatus.DONE)
    expect(store.state.GetPokemonAbility.ability).toEqual({ key1: 'result' })
  })

  it('fetchPokemonAbility action failed', async () => {
    const store = createVuexStore()
    let promiseReject: any
    const fakePromise = new Promise((resolve, reject) => (promiseReject = reject))
    ;(getPokemonAbility as any).mockResolvedValueOnce(fakePromise)
    const callPromise = store.dispatch('GetPokemonAbility/fetchPokemonAbility')
    await new Promise((r) => setTimeout(r))
    expect(store.state.GetPokemonAbility.status).toEqual(CallStatus.LOADING)
    promiseReject('error')
    await expect(callPromise).rejects.toThrowError()
    expect(store.state.GetPokemonAbility.status).toEqual(CallStatus.FAILED)
  })

  it('clean store module action', async () => {
    const store = createVuexStore()
    store.state.GetPokemonAbility.status = CallStatus.LOADING
    store.state.GetPokemonAbility.ability = { test: 'test1' }
    await store.dispatch('GetPokemonAbility/clean')
    expect(store.state.GetPokemonAbility.status).toEqual(CallStatus.INITIAL)
    expect(store.state.GetPokemonAbility.ability).toEqual(null)
  })
})
