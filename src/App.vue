<script setup lang="ts">
import { File, Repl, useStore } from '@vue/repl';
import Monaco from '@vue/repl/monaco-editor';
// import CodeMirror from '@vue/repl/codemirror-editor';
import { ref } from 'vue';
import components from './components.js?raw';
import { AppCodeStr } from './templates/App.vue.ts';
import { mainCSS } from './templates/css.ts';
import { mainTS } from './templates/main';
import { newSFC } from './templates/newSFC.ts';

const files = ref<Record<string, File>>({
  // NOTE: This will be replaced with CDN links
  'src/components.js': new File('src/components.js', components, true),
  'src/main.css': new File('src/main.css', mainCSS, true),
  'src/main.ts': new File('src/main.ts', mainTS, true),
})

const store = useStore(
  {
    files,
    template: ref({
        welcomeSFC: AppCodeStr,
        newSFC: newSFC,
    })
  },
  location.hash
);

// store.setFiles({
//   'import-map.json': JSON.stringify({
//     imports: {
//       ...vueImportMap.importMap.value.imports,
//       // '@nuxt/ui': genCdnLink('@nuxt/ui', '4.0.0-alpha.2', '/dist/runtime/types/index.js'),
//     },
//   }, null, 2),
// });

// NOTE: This is using too much resources so will disable for now
// persist state to URL hash
// watchEffect(() => history.replaceState({}, '', store.serialize()))
</script>

<template>
  <Repl :store="store" :editor="Monaco" style="height: 100dvh" :clear-console="false" />
</template>
