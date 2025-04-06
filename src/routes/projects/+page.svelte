<script lang="ts">
  import type { PageData } from "./$types";
    export let data: PageData;

  import JavaScriptIcon from '$lib/assets/svgs/javascript.svg';
  import TypeScriptIcon from '$lib/assets/svgs/typescript.svg';
  import CPlusPlusIcon from '$lib/assets/svgs/cplusplus.svg';
  import CIcon from '$lib/assets/svgs/c.svg';
  import CssIcon from '$lib/assets/svgs/css.svg';
  import BashIcon from '$lib/assets/svgs/gnubash.svg'
  import svelteIcon from '$lib/assets/svgs/svelte.svg'

  import type { SupportedLanguage } from "$lib/types/languages";
  
  const languageIcons: Record<SupportedLanguage, string> = {
    'JavaScript': JavaScriptIcon,
    'TypeScript': TypeScriptIcon,
    'C++': CPlusPlusIcon,
    'C': CIcon,
    'CSS': CssIcon,
    'Shell': BashIcon,
    'Svelte': svelteIcon
  } as const;
  
  function getLanguageIcon(language: string): string | undefined {
    return languageIcons[language as SupportedLanguage];
  }
</script>

<div class="min-h-screen flex flex-col items-center justify-center">
  <h1 class="text-4xl font-bold mb-12 text-center">Projects</h1>

  {#if data.error}
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center"
    >
      Error: {data.error}
    </div>
  {/if}

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each data.projects?.slice(0, 6) || [] as project}
      <div
        class="bg-navyblack/75 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-transparent hover:border-white/75 h-full flex flex-col"
      >
        <div class="p-5">
          <div class="flex justify-between items-start mb-3">
            <h2 class="text-lg font-bold">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {project.name}
              </a>
            </h2>
            <div class="flex space-x-2">
              <span
                class="text-xs text-gray-500 dark:text-gray-400 flex items-center"
              >
                ⭐ {project.stargazerCount}
              </span>
              <span
                class="text-xs text-gray-500 dark:text-gray-400 flex items-center"
              >
                🍴 {project.forkCount}
              </span>
            </div>
          </div>

          {#if project.primaryLanguage}
            <div class="flex items-center gap-2 mb-2">
              {#if languageIcons[project.primaryLanguage.name]}
                <img
                  src={languageIcons[project.primaryLanguage.name]}
                  alt={project.primaryLanguage.name}
                  class="w-5 h-5 filter brightness-15 invert"
                />
              {/if}
              <span
                class="text-xs font-medium"
                style="color: {project.primaryLanguage.color}"
              >
                {project.primaryLanguage.name}
              </span>
            </div>
          {/if}

          <p class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {project.description || "No description provided"}
          </p>
        </div>

        <div class="mt-auto p-5 pt-0">
          <div class="flex space-x-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              GitHub
            </a>
            {#if project.homepageUrl}
              <a
                href={project.homepageUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                Website
              </a>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>

  {#if data.projects?.length > 6}
    <p class="text-center text-gray-500 mt-8">
      Showing 6 of {data.projects.length} pinned projects
    </p>
  {/if}
</div>
