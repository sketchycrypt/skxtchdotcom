import adapter from "@sveltejs/adapter-netlify";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: '404.html',
      precompress: false,
      strict: true,
    }),
    alias: {
      '$lib/*': './src/lib/*'
    }
  },
  preprocess: vitePreprocess(),
};

export default config;


