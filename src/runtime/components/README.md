# TldrawNuxt Component

This directory contains the main `TldrawNuxt.vue` component that wraps tldraw for use in Nuxt applications.

## How It Works

The component uses React's `createRoot` API to mount the tldraw editor (which is built with React) inside a Vue component. This is possible because:

1. Vue and React can coexist in the same application
2. We use `<ClientOnly>` to ensure the component only renders on the client side
3. We properly manage the React root lifecycle with Vue's `onMounted` and `onBeforeUnmount` hooks

## Key Features

- **Client-Only**: Uses `<ClientOnly>` wrapper to avoid SSR issues
- **React Integration**: Creates a React root to mount the tldraw editor
- **Lifecycle Management**: Properly handles mounting and unmounting
- **Props**: Exposes Vue-friendly props for configuration
- **Persistence**: Optional local storage persistence with `persistenceKey`
- **Styling**: Imports tldraw's CSS and provides default container styles

## Props

### `autoFocus`
- Type: `boolean`
- Default: `true`
- Description: Whether the editor should automatically focus when mounted

### `persistenceKey`
- Type: `string`
- Default: `undefined`
- Description: A unique key for persisting the editor state to browser local storage. When provided, the drawing will be saved automatically and restored on page reload.

### `options`
- Type: `Partial<TLEditorOptions>`
- Default: `undefined`
- Description: Advanced options to pass to the tldraw editor instance

## Examples

### Basic Usage
```vue
<template>
  <div class="container">
    <TldrawNuxt />
  </div>
</template>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
}
</style>
```

**Important**: The parent container MUST have:
- A defined height
- A positioning context (`position: relative/absolute/fixed`)

### With Persistence
```vue
<template>
  <TldrawNuxt persistence-key="my-drawing" />
</template>
```

### Custom Height
```vue
<template>
  <div class="my-container">
    <TldrawNuxt />
  </div>
</template>

<style>
.my-container {
  height: 600px;
}
</style>
```

## Technical Details

The component follows this flow:

1. **Template**: Renders a `<ClientOnly>` wrapper with a div that will contain the tldraw editor
2. **onMounted**: Creates a React root and renders the tldraw component into the div
3. **Props Watching**: Watches for prop changes and remounts if necessary
4. **onBeforeUnmount**: Cleans up the React root to prevent memory leaks

This approach is based on the [official tldraw Vue template](https://github.com/tldraw/vue-template).

