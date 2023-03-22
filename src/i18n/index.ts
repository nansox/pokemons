import { createI18n } from 'vue-i18n'
const messages = {
  en: {
    Select_a_Category: 'Select a Category',
    Search_a_Pokemon: 'Search a Pokemon'
  }
}

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  messages
})
