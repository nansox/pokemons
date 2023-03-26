export type PokemonList = {
  count: number
  next: string
  previous: null
  results: {
    name: string
    url: string
  }[]
}

export type Pokemon = {
  id: number
  name: string
  base_experience: number
  height: number
  is_default: boolean
  order: number
  weight: number
  abilities: LitPokemonAbility[]
  forms: NamedAPIResource[]
  game_indices: VersionGameIndex[]
  held_items: PokemonHeldItem[]
  location_area_encounters: string
  moves: PokemonMove[]
  past_types: PokemonTypePast[]
  sprites: PokemonSprites
  species: NamedAPIResource
  stats: PokemonStat[]
  types: LitPokemonType[]
}

export type LitPokemonAbility = {
  is_hidden: boolean
  slot: number
  ability: NamedAPIResource
}

export type LitPokemonType = {
  slot: number
  type: NamedAPIResource
}
export type PokemonFormType = {
  slot: number
  type: NamedAPIResource
}

export type PokemonTypePast = {
  generation: NamedAPIResource
  types: LitPokemonType[]
}

export type PokemonHeldItem = {
  item: NamedAPIResource
  version_details: PokemonHeldItemVersion[]
}

export type PokemonMove = {
  move: NamedAPIResource
  version_group_details: PokemonMoveVersion[]
}

export type PokemonMoveVersion = {
  move_learn_method: NamedAPIResource
  version_group: NamedAPIResource
  level_learned_at: number
}

export type PokemonStat = {
  stat: NamedAPIResource
  effort: number
  base_stat: number
}

export type PokemonSprites = {
  front_default: string
  front_shiny: string
  front_female: string
  front_shiny_female: string
  back_default: string
  back_shiny: string
  back_female: string
  back_shiny_female: string
}
export type VersionGameIndex = {
  game_index: number
  version: NamedAPIResource
}
export type NamedAPIResource = {
  name: string
  url: string
}
export type PokemonHeldItemVersion = {
  version: NamedAPIResource
  rarity: number
}

export interface PokemonType {
  damage_relations: PokemonDamageRelations
  game_indices: PokemonGameIndex[]
  generation: NamedAPIResource
  id: number
  move_damage_class: NamedAPIResource
  moves: NamedAPIResource[]
  name: string
  names: PokemonName[]
  past_damage_relations: any[]
  pokemon: LitPokemonType[]
}

export interface PokemonDamageRelations {
  double_damage_from: NamedAPIResource[]
  double_damage_to: any[]
  half_damage_from: any[]
  half_damage_to: NamedAPIResource[]
  no_damage_from: NamedAPIResource[]
  no_damage_to: NamedAPIResource[]
}

export interface PokemonGameIndex {
  game_index: number
  generation: NamedAPIResource
}

export interface PokemonName {
  language: NamedAPIResource
  name: string
}

export interface PokemonAbility {
  id: number
  name: string
  is_main_series: boolean
  generation: NamedAPIResource
  names: { name: string; language: NamedAPIResource }[]
  effect_entries: { effect: string; short_effect: string; language: NamedAPIResource }[]
}
