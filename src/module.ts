import { defineNuxtModule, addPlugin, createResolver, addComponent } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@type32/tldraw-nuxt',
    configKey: 'tldrawNuxt',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    // Transpile React and tldraw packages
    _nuxt.options.build.transpile = _nuxt.options.build.transpile || []
    _nuxt.options.build.transpile.push('react', 'react-dom', 'tldraw')

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    // Register the TldrawNuxt component
    addComponent({
      name: 'TldrawNuxt',
      filePath: resolver.resolve('./runtime/components/TldrawNuxt.vue'),
    })

		_nuxt.options.css.unshift(resolver.resolve('./runtime/css/index.css'))
  },
})
