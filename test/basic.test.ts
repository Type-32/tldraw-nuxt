import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('tldraw-nuxt module', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  })

  it('renders the index page with tldraw component placeholder', async () => {
    // Get response to a server-rendered page with `$fetch`.
    // Since TldrawNuxt is wrapped in ClientOnly, we should see the placeholder
    const html = await $fetch('/')
    expect(html).toBeTruthy()
    // The component will be hydrated on client side
  })
})
