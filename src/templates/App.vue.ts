export const AppCodeStr = `<script setup lang="ts">
import { ref } from 'vue';
import { UAccordion, UInput } from './components.js'; /* Load Nuxt UI component from here */
import './main.ts'; /* Do not remove */

const items = ref([
  {
    label: 'Is Nuxt UI free to use?',
    content: 'Yes! Nuxt UI is completely free and open source under the MIT license. All 100+ components are available to everyone.'
  },
  {
    label: 'Can I use Nuxt UI with Vue without Nuxt?',
    content: 'Yes! While optimized for Nuxt, Nuxt UI works perfectly with standalone Vue projects via our Vite plugin. You can follow the [installation guide](/docs/getting-started/installation/vue) to get started.'
  },
  {
    label: 'Is Nuxt UI production-ready?',
    content: 'Yes! Nuxt UI is used in production by thousands of applications with extensive tests, regular updates, and active maintenance.'
  }
])

const msg = ref('Welcome to Nuxt UI Playground')
</script>

<template>
  <div class="p-8 flex flex-col gap-4">
    <h1 class="text-2xl font-bold text-primary">{{ msg }}</h1>
    <UInput v-model="msg"></UInput>
    <UAccordion :items="items" />
  </div>
</template>`
