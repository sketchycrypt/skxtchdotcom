<script lang="ts">
    import { onMount } from 'svelte';
  import { getSVG } from '$lib/utils/svgImporter';
  
  export let language: string;
  
  let svgContent = '';
  let loading = true;
  
  onMount(async () => {
    svgContent = await getSVG(language);
    loading = false;
    console.log(`SVG for ${language}:`, svgContent ? "Loaded" : "Missing");
  });
</script>

{#if loading}
  <div class="w-5 h-5 mr-2 bg-gray-200 rounded animate-pulse"></div>
{:else if svgContent}
  <div class="w-5 h-5 mr-2" title={language}>
    {@html svgContent}
  </div>
{:else}
  <span class="text-xs text-gray-400">missing_icon</span>
{/if}