<script setup lang="ts">
useHead({
  title: 'TldrawNuxt - Playground',
})
</script>

<template>
  <div class="page-container">
    <header class="header">
      <h1>@type32/tldraw-nuxt Playground</h1>
      <p>Start drawing on the infinite canvas below! Your work is auto-saved.</p>
    </header>
    <div class="editor-container">
      <TldrawNuxt persistence-key="tldraw-nuxt-playground" />
    </div>
  </div>
</template>

<style scoped>
.page-container {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.header p {
  margin: 0.5rem 0 0 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.editor-container {
  flex: 1;
  min-height: 0;
  position: relative;
}
</style>
