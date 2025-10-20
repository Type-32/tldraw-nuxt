# @type32/tldraw-nuxt Examples

This document provides various examples of how to use the `<TldrawNuxt />` component in your Nuxt application.

## Table of Contents

- [Basic Usage](#basic-usage)
- [With Persistence](#with-persistence)
- [Custom Height](#custom-height)
- [Full Page Canvas](#full-page-canvas)
- [Multiple Instances](#multiple-instances)
- [Integration with Layouts](#integration-with-layouts)

## Basic Usage

The simplest way to use tldraw in your Nuxt app:

```vue
<template>
  <div class="container">
    <h1>My Drawing App</h1>
    <TldrawNuxt />
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

h1 {
  padding: 1rem;
  margin: 0;
}
</style>
```

## With Persistence

Save and restore the drawing automatically using local storage:

```vue
<template>
  <div>
    <TldrawNuxt persistence-key="my-project-drawing" />
  </div>
</template>
```

The `persistence-key` prop ensures that:
- Your drawing is saved automatically as you work
- The drawing is restored when you reload the page
- Different keys allow for multiple saved drawings

## Custom Height

Control the height of the canvas:

```vue
<template>
  <div class="app">
    <header>
      <h1>My App Header</h1>
    </header>
    
    <div class="canvas-container">
      <TldrawNuxt />
    </div>
    
    <footer>
      <p>My App Footer</p>
    </footer>
  </div>
</template>

<style scoped>
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

header, footer {
  flex-shrink: 0;
  padding: 1rem;
  background: #f5f5f5;
}

.canvas-container {
  flex: 1;
  min-height: 0; /* Important for flexbox */
}
</style>
```

## Full Page Canvas

Make tldraw take up the entire viewport:

```vue
<template>
  <div class="full-page">
    <TldrawNuxt />
  </div>
</template>

<style scoped>
.full-page {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>
```

## Multiple Instances

Use multiple tldraw instances on the same page with different persistence keys:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref<'drawing1' | 'drawing2'>('drawing1')
</script>

<template>
  <div class="multi-canvas">
    <div class="tabs">
      <button 
        @click="activeTab = 'drawing1'" 
        :class="{ active: activeTab === 'drawing1' }"
      >
        Drawing 1
      </button>
      <button 
        @click="activeTab = 'drawing2'" 
        :class="{ active: activeTab === 'drawing2' }"
      >
        Drawing 2
      </button>
    </div>
    
    <div class="canvas-container">
      <TldrawNuxt 
        v-if="activeTab === 'drawing1'"
        persistence-key="drawing-1"
      />
      <TldrawNuxt 
        v-if="activeTab === 'drawing2'"
        persistence-key="drawing-2"
      />
    </div>
  </div>
</template>

<style scoped>
.multi-canvas {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  background: #f5f5f5;
}

.tabs button {
  padding: 0.5rem 1rem;
  border: none;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

.tabs button.active {
  background: #667eea;
  color: white;
}

.canvas-container {
  flex: 1;
  min-height: 0;
}
</style>
```

## Integration with Layouts

Using tldraw in a page with a Nuxt layout:

**layouts/default.vue:**
```vue
<template>
  <div class="layout">
    <nav class="sidebar">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/canvas">Canvas</NuxtLink>
      <NuxtLink to="/about">About</NuxtLink>
    </nav>
    
    <main class="content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 200px;
  background: #2c3e50;
  color: white;
  padding: 1rem;
}

.sidebar a {
  display: block;
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}

.content {
  flex: 1;
  overflow: hidden;
}
</style>
```

**pages/canvas.vue:**
```vue
<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div class="canvas-page">
    <TldrawNuxt persistence-key="main-canvas" />
  </div>
</template>

<style scoped>
.canvas-page {
  height: 100%;
  width: 100%;
}
</style>
```

## Disabling Auto-Focus

If you don't want the canvas to automatically focus on mount:

```vue
<template>
  <TldrawNuxt :auto-focus="false" />
</template>
```

## Tips and Best Practices

1. **Container Sizing**: Always ensure the parent container of `<TldrawNuxt />` has a defined height
2. **Persistence Keys**: Use unique, descriptive keys for different drawings
3. **Performance**: Avoid placing multiple tldraw instances in the same view when possible
4. **Styling**: The component imports tldraw's CSS automatically, so you don't need to import it separately
5. **SSR**: The component automatically handles client-only rendering, so it works seamlessly with Nuxt's SSR

## Troubleshooting

### Canvas not showing

**Issue**: The canvas container is empty or nothing renders.

**Solutions**:
1. **Ensure parent container has height and positioning**:
   ```vue
   <style scoped>
   .container {
     position: relative; /* Important! */
     width: 100%;
     height: 100vh; /* Or any defined height */
   }
   </style>
   ```

2. **Check browser console** for any errors or warnings
   - Look for "TldrawNuxt: Successfully mounted" message
   - If you see "Container ref not available", the DOM isn't ready

3. **Verify the module is installed and configured**:
   ```ts
   // nuxt.config.ts
   export default defineNuxtConfig({
     modules: ['@type32/tldraw-nuxt']
   })
   ```

4. **For flex/grid layouts**, ensure the container has defined dimensions:
   ```vue
   <style scoped>
   .parent {
     display: flex;
     height: 100vh;
   }
   .container {
     flex: 1;
     position: relative; /* Important! */
   }
   </style>
   ```

### Drawing not persisting
- Ensure you've set a `persistence-key` prop
- Check browser's local storage to verify the data is being saved
- Make sure local storage is not disabled

### Multiple instances interfering
- Always use different `persistence-key` values for different canvases
- Consider using `v-if` instead of `v-show` for tab switching

### Build errors with React
- The module automatically transpiles React dependencies
- If you encounter issues, try clearing `.nuxt` and `node_modules/.cache`
- Restart the dev server after module configuration changes

