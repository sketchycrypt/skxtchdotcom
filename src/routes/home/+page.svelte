<svelte:head>
    <title>Home</title> 
</svelte:head>

<script>
  import Typewriter from "$lib/components/typewriter.svelte";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { invalidate } from "$app/navigation";
  import messages from "$lib/texts.json"

  let lastUpdated = new Date();
  let isLoading = false;

  async function refreshNowPlaying() {
    await invalidate("now-playing");
    lastUpdated = new Date();
  }
  /**
   * @type {number | undefined}
   */
  let refreshInterval;
  onMount(() => {
    refreshInterval = setInterval(refreshNowPlaying, 30000);
    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
    };
  });
</script>

<div
  class="min-h-screen flex flex-col items-center justify-center space-y-6 px-4"
>
  <h2 class="text-3xl font-bold text-center hover:rotate-x-15 hover:-rotate-y-15 transition ease-in-out cursor-pointer">skxtch</h2>

  <div class="font-lexend text-2xl w-128 h-8 text-center">
    <Typewriter
      texts={messages}
      typingSpeed={80}
      deletingSpeed={40}
      pauseBetween={1500}
      cursorBlinkSpeed={300}
    />
  </div>

  <div
    class="w-full max-w-md p-4 rounded-lg bg-navyblack/75 text-white text-center"
  >
    <div class="mb-2 text-xs text-gray-400">Currently listening to :</div>

    {#if $page.data.error}
      <div class="text-red-400">{$page.data.error}</div>
    {:else if $page.data.nowPlaying}
      <div class="flex items-center justify-center space-x-2">
        {#if $page.data.nowPlaying.isNowPlaying}
          <span class="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
          <p>
            🎵
            <a
              href={$page.data.nowPlaying.links.spotifyTrack}
              target="_blank"
              rel="noopener noreferrer"
              class="font-medium hover:underline hover:text-green-400 transition-colors"
            >
              {$page.data.nowPlaying.song}
            </a>
            {" by "}
            <a
              href={$page.data.nowPlaying.links.spotifyArtist}
              target="_blank"
              rel="noopener noreferrer"
              class="font-medium hover:underline hover:text-green-400 transition-colors"
            >
              {$page.data.nowPlaying.artist}
            </a>
          </p>
        {:else if !$page.data.nowPlaying.isNowPlaying}
          <div class="no-track">
          <p>No music currently playing</p>
          <p class="text-sm text-gray-400">I'm currently not listening to anything</p>
          </div>
        {/if}

      </div>
    {:else}
      <p>No song currently playing</p>
    {/if}
  </div>
</div>
