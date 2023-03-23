import type { Pokemon, PokemonList } from '@/modules/pokemons/api/pokemon-types'

export const getPokemonsList = async () =>
  fetch('https://pokeapi.co/api/v2/pokemon', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) =>
    response.ok
      ? (response.json() as Promise<PokemonList>)
      : Promise.reject('Error on get pokemon list')
  )

export const getPokemonDetail = async (name: string) =>
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) =>
    response.ok
      ? (response.json() as Promise<Pokemon>)
      : Promise.reject('Error on get pokemon detail')
  )
