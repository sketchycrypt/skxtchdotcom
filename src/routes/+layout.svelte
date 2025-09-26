<script>
  let { children } = $props();
  import { fade } from "svelte/transition";
  import { page } from "$app/stores"; 
  import "../app.css";

  export const navLinks = [
    { href: "/home", text: "Home" },
    { href: "/projects", text: "Projects" }, 
    { href: "/contact", text: "Contact" },
    { href: "/about", text: "About Me" },
  ];

  // @ts-ignore
  let { mobileMenuOpen } = $state(false);
  
  function toggleMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

</script>

<svelte:head>
  <link rel="shortcut icon" href="/favicon.ico"/>
  <title>Projects</title>
</svelte:head>

<main class="font-instrumentsans font-bold relative text-white">
 
 <!-- <div
    class="opacity-100 scale-105 fixed inset-0 bg-cover bg-center bg-no-repeat blur-md z-0"
    style="background-image: url('{background}')"
  ></div> -->
  


  <div class="relative z-10 flex flex-col min-h-screen">
    <div class="absolute inset-0 bg-gradient-to-t from-neutral-900 to-neutral-900 -z-10"></div>
    <nav class="bg-linear-to-b from-black/30 to-neutral-900 backdrop-blur-sm py-4 md:py-4 sticky top-0 z-20">
      <div class="container md:mx-auto px-4 sm:px-6">
        <div class="hidden md:flex justify-center space-x-2 sm:space-x-4 md:space-x-6">
          {#each navLinks as { href, text }}
            <a
              href={href}
              class="px-2 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-lg transition-all duration-300
                     hover:bg-white/10 hover:scale-105
                     {$page.url.pathname === href ? 'bg-white/20 font-extrabold' : 'opacity-90'}"
            >
              {text}
            </a>
          {/each}
        </div>
        
        <div class="md:hidden flex items-center justify-between">

          <a href="/home" class="absolute left-1/2 transform -translate-x-1/2 text-lg font-extrabold tracking-tight text-white">
            skxtch.com
          </a>
    
          <button 
            onclick={toggleMenu}
            class="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg 
              class="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {#if mobileMenuOpen}
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              {:else}
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              {/if}
            </svg>
          </button>

          {#if mobileMenuOpen}
          
            <div class="absolute top-13 left-0 right-0 bg-neutral-900/95 backdrop-blur-md py-4 px-6">
              <div class="flex flex-col space-y-4">
                {#each navLinks as { href, text }}
                  <a
                    href={href}
                    class="px-4 py-2 text-base rounded-lg transition-all duration-300
                           hover:bg-white/10
                           {$page.url.pathname === href ? 'bg-white/20 font-extrabold' : 'opacity-90'}"
                    onclick={() => mobileMenuOpen = false}
                  >
                    {text}
                  </a>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </div>
    </nav>

    <div class="container mx-auto p-6 flex-grow flex flex-col justify-center items-center text-center">
      {#key children}
        <div transition:fade>
          {@render children()}
        </div>
      {/key}
    </div>
    

    <footer class="bg-linear-to-t from-black/30 to-neutral-900 text-white text-center p-8 mb-0">
      © 2024-2025 skxtch.com
    </footer>
  </div>
</main>