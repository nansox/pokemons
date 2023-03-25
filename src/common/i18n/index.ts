import { createI18n } from 'vue-i18n'
const messages = {
  en: {
    damage: 'damage',
    Resistant_to: 'Resistant to',
    Vulnerable_to: 'Vulnerable to',
    Pokemon_type: 'Pokémon type',
    Select_a_Category: 'Select a Category',
    Search_a_Pokemon: 'Search a Pokemon',
    Best_moveset_for: 'Best moveset for {name}'
  }
}

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  messages
})
