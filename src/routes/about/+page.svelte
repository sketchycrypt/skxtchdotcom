
<svelte:head>
    <title>About</title> 
</svelte:head>
<script>
  export let data;
</script>

  <div class="min-h-screen flex flex-col items-center justify-center space-y-6">
    <h2 class="text-3xl font-bold text-center">skxtch</h2>

    <!-- svelte-ignore a11y_img_redundant_alt -->
    <img
      src={data.avatarUrl}
      alt="Profile Picture"
      class="w-32 h-32 rounded-full shadow-lg border-4 transition-transform duration-300 hover:scale-105"
    />

    <p class="text-2xl max-w-md text-center">
      I am an 18-year-old from Morocco who enjoys developing things for fun and
      occasionally tackling difficult challenges.
    </p>
  </div>
