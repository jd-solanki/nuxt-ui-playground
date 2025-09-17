<script setup lang="ts">
import { Repl, useStore, useVueImportMap } from '@vue/repl';
import Monaco from '@vue/repl/monaco-editor';
import components from './components.js?raw';
import AppCodeStr from './templates/App.Vue?raw';
import { mainCSS } from './templates/css.ts';
import { mainTS } from './templates/main';
// import { genCdnLink } from './utils';

const vueImportMap = useVueImportMap();


const store = useStore();

store.setFiles({
  'src/App.vue': AppCodeStr,
  'main.css': mainCSS,
  'main.ts': mainTS,

  // NOTE: This will be replaced with CDN links
  'components.js': components,

  'import-map.json': JSON.stringify({
    imports: {
      ...vueImportMap.importMap.value.imports,
      // '@nuxt/ui': genCdnLink('@nuxt/ui', '4.0.0-alpha.2', '/dist/runtime/types/index.js'),
    },
  }, null, 2),
});
</script>

<template>
  <Repl :store="store" :editor="Monaco" style="height: 100dvh" :clear-console="false" />
</template>
