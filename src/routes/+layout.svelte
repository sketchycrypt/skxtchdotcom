<script>
  let { children } = $props();
  import background from "$lib/assets/bg.png";
  import { fade } from "svelte/transition";
  import { page } from "$app/stores"; 
  import "../app.css";

  export const navLinks = [
    { href: "/home", text: "Home" },
    { href: "/projects", text: "Projects" }, 
    { href: "/contact", text: "Contact" },
    { href: "/about", text: "About Me" },
  ];
</script>

<svelte:head>
  <link rel="shortcut icon" href="/favicon.ico"/>
</svelte:head>

<main class="font-lexend font-bold relative min-h-screen text-white">
  <div
    class="opacity-100 scale-105 fixed inset-0 bg-cover bg-center bg-no-repeat blur-sm z-0"
    style="background-image: url('{background}')"
  ></div>

  <div class="relative z-10 flex flex-col min-h-screen">
    <nav class="bg-neutral-900/90 backdrop-blur-sm py-4 sticky top-0 z-20">
      <div class="container mx-auto px-6">
        <div class="flex justify-center space-x-6">
          {#each navLinks as { href, text }}
            <a
              href={href}
              class="px-4 py-2 rounded-lg transition-all duration-300
                     hover:bg-white/10 hover:scale-105
                     {$page.url.pathname === href ? 'bg-white/20 font-extrabold' : 'opacity-90'}"
            >
              {text}
            </a>
          {/each}
        </div>
      </div>
    </nav>

    <div class="container mx-auto p-6 flex-grow">
      {#key children}
        <div transition:fade>
          {@render children()}
        </div>
      {/key}
    </div>

    <footer class="bg-neutral-900 text-white text-center p-8 mb-0">
      © 2024-2025 skxtch.com
    </footer>
  </div>
</main>