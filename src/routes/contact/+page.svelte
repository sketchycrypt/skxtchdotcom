<script>
  import twitterIcon from "$lib/assets/svgs/social/x.svg";
  import bskyIcon from "$lib/assets/svgs/social/bluesky.svg";
  import mastodonIcon from "$lib/assets/svgs/social/mastodon.svg";
  import mailIcon from "$lib/assets/svgs/social/mail.svg";

  const buttons = [
    {
      id: 1,
      link: "https://mastodon.social/@skxtch",
      text: "mastodon",
      icon: mastodonIcon,
    },
    {
      id: 2,
      link: "https://bsky.app/profile/skxtch.com",
      text: "bluesky",
      icon: bskyIcon,
    },
    { id: 3, link: "mailto:contact@skxtch.com", text: "email", icon: mailIcon },
  ];
</script>

<svelte:head>
  <title>Contact</title>
</svelte:head>

<main class="min-h-screen flex items-center justify-center p-4">
  <div class="flex flex-col items-center gap-4 w-full max-w-xs">
    {#each buttons as button}
      <a
        href={button.link}
        class="flex items-center justify-center gap-3 bg-navyblack w-48 px-6 py-3 rounded-lg text-white font-medium shadow-md hover:scale-105 hover:invert transition ease-in-out"
      >
        <img
          src={button.icon}
          alt={button.text + " icon"}
          class="w-5 h-5 filter brightness-15 invert"
        />
        <span>{button.text}</span>
      </a>
    {/each}
  </div>
</main>
