# Pokemons

This proyect is a test for a work interview. It's a SPA developed in Vue 3, with Typescript, Vuex, Vue-Router and i18n. The components has been developed with composition API and setup script.

## Project Structure

The code of this project is distributed in modules. Each module envolves views(routed components), components, store modules, service calls, utils(reusable functions, etc), etc.The common module (src/common) includes everithing generic at level aplication. Ej: generic components, common configuration, etc. The rest of the modules are in src/modules. Each module correspond with its context in the aplication

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
