<template>
  <ClientOnly>
    <div ref="containerRef" class="tldraw-container" />
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { createRoot } from 'react-dom/client'
import { createElement } from 'react'
import { Tldraw, type TLEditorOptions } from 'tldraw'
import '../css/index.css'

export interface TldrawNuxtProps {
  options?: Partial<TLEditorOptions>
  autoFocus?: boolean
  persistenceKey?: string
}

const props = withDefaults(defineProps<TldrawNuxtProps>(), {
  autoFocus: true,
})

const containerRef = ref<HTMLDivElement | null>(null)
let root: ReturnType<typeof createRoot> | null = null

const mountTldraw = async () => {
  // Wait for next tick to ensure DOM is ready
  await nextTick()
  
  if (!containerRef.value) {
    console.warn('TldrawNuxt: Container ref not available')
    return
  }

  try {
    // Create React root and render tldraw
    root = createRoot(containerRef.value)
    
    const tldrawProps: any = {
      autoFocus: props.autoFocus,
    }

    if (props.persistenceKey) {
      tldrawProps.persistenceKey = props.persistenceKey
    }

    root.render(createElement(Tldraw, tldrawProps))
    console.log('TldrawNuxt: Successfully mounted')
  } catch (error) {
    console.error('TldrawNuxt: Failed to mount', error)
  }
}

const unmountTldraw = () => {
  if (root) {
    root.unmount()
    root = null
  }
}

onMounted(() => {
  mountTldraw()
})

onBeforeUnmount(() => {
  unmountTldraw()
})

// Watch for prop changes and remount if necessary
watch(() => props.persistenceKey, () => {
  unmountTldraw()
  mountTldraw()
})
</script>

<style scoped>
.tldraw-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>

