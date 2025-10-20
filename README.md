<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: my-module
- Description: My new Nuxt module
-->

# @type32/tldraw-nuxt

tldraw as a component for Nuxt. A plug-and-play Nuxt module that provides the tldraw infinite canvas whiteboard as a Vue component.

## Features

- 🎨 Full-featured infinite canvas whiteboard powered by [tldraw](https://tldraw.dev)
- 🔌 Plug-and-play integration with Nuxt 3+
- 🎯 Auto-imported `<TldrawNuxt />` component
- 💾 Optional persistence to local storage
- ⚡ Client-side only rendering (no SSR issues)
- 📝 Full TypeScript support

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
bunx nuxi module add @type32/tldraw-nuxt
```
or
```bash
bun add @type32/tldraw-nuxt
```

Then add it to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['@type32/tldraw-nuxt']
})
```

That's it! You can now use `<TldrawNuxt />` in your Nuxt app ✨

## Usage

### Basic Usage

Simply add the component to any page. Make sure the parent container has a defined height:

```vue
<template>
  <div class="container">
    <TldrawNuxt />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  position: relative;
}
</style>
```

### With Persistence

Save the editor state to local storage:

```vue
<template>
  <div>
    <TldrawNuxt persistence-key="my-drawing" />
  </div>
</template>
```

### Custom Styling

The component fills its parent container. You can customize the container height:

```vue
<template>
  <div class="custom-container">
    <TldrawNuxt />
  </div>
</template>

<style scoped>
.custom-container {
  position: relative;
  width: 100%;
  height: 600px;
}
</style>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoFocus` | `boolean` | `true` | Whether the editor should auto-focus on mount |
| `persistenceKey` | `string` | `undefined` | Key for persisting state to local storage |

### Important Notes

⚠️ **Container Requirements**: The component needs a parent container with:
- A defined height (e.g., `height: 100vh` or `height: 600px`)
- Positioning context (`position: relative`, `absolute`, or `fixed`)

Without these, the canvas won't be visible. See examples above for proper setup.

## How It Works

This module wraps the React-based [tldraw](https://tldraw.dev) library for use in Vue/Nuxt applications. The `<TldrawNuxt />` component:

1. Renders only on the client side (using `<ClientOnly>`)
2. Creates a React root to mount the tldraw editor
3. Properly handles Vue lifecycle for mounting/unmounting
4. Exposes a simple Vue component API

Based on the [tldraw Vue template](https://github.com/tldraw/vue-template).


## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  bun install
  
  # Generate type stubs
  bun run dev:prepare
  
  # Develop with the playground
  bun run dev
  
  # Build the playground
  bun run dev:build
  
  # Run ESLint
  bun run lint
  
  # Run Vitest
  bun run test
  bun run test:watch
  
  # Release new version
  bun run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/my-module/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/my-module

[npm-downloads-src]: https://img.shields.io/npm/dm/my-module.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/my-module

[license-src]: https://img.shields.io/npm/l/my-module.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/my-module

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
