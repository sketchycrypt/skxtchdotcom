<script>
// @ts-nocheck
import {
    onDestroy
} from "svelte";
import ArchLinux from "$lib/assets/svgs/archlinux.svg";
import TypeScript from "$lib/assets/svgs/typescript.svg";
import Svelte from "$lib/assets/svgs/svelte.svg";
import arrow from "$lib/assets/svgs/downwardArrow.svg";

import bskyIcon from "$lib/assets/svgs/social/bluesky.svg";
import mastodonIcon from "$lib/assets/svgs/social/mastodon.svg";
import mailIcon from "$lib/assets/svgs/social/mail.svg";
import githubIcon from "$lib/assets/svgs/social/github.svg"

const buttons = [{
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
    {
        id: 3,
        link: "https://github.com/sketchycrypt",
        text: "github",
        icon: githubIcon
    },
    {
        id: 4,
        link: "mailto:contact@skxtch.com",
        text: "email",
        icon: mailIcon
    },
];

const logos = [{
        name: "Arch Linux",
        component: ArchLinux
    },
    {
        name: "TypeScript",
        component: TypeScript
    },
    {
        name: "Svelte",
        component: Svelte
    },
];

export let data;
let hovering = false;
let rotation = {
    x: 0,
    y: 0,
    z: 0
};
let targetRotation = {
    x: 0,
    y: 0,
    z: 0
};
/**
 * @type {number | null}
 */
let animationFrame;
const rotationSpeed = 0.5;
const deceleration = 0.5;

/**
 * @param {number} current
 * @param {number} target
 * @param {number} factor
 */
function lerp(current, target, factor) {
    return current + (target - current) * factor;
}

/**
 * @param {any} time
 */
function animate(time) {
    if (hovering) {
        rotation.x = (rotation.x + rotationSpeed) % 360;
        rotation.y = (rotation.y + rotationSpeed) % 360;
        rotation.z = (rotation.z + rotationSpeed * 0.5) % 360;
        targetRotation = {
            ...rotation
        };
    } else {
        rotation.x = lerp(rotation.x, targetRotation.x, deceleration);
        rotation.y = lerp(rotation.y, targetRotation.y, deceleration);
        rotation.z = lerp(rotation.z, targetRotation.z, deceleration);

        if (
            Math.abs(rotation.x - targetRotation.x) < 0.1 &&
            Math.abs(rotation.y - targetRotation.y) < 0.1 &&
            Math.abs(rotation.z - targetRotation.z) < 0.1
        ) {
            // @ts-ignore
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
            return;
        }
    }

    animationFrame = requestAnimationFrame(animate);
}

function startRotation() {
    if (!hovering) {
        hovering = true;
        animationFrame = requestAnimationFrame(animate);
    }
}

function stopRotation() {
    hovering = false;
    targetRotation = {
        x: Math.round(rotation.x / 360) * 360,
        y: Math.round(rotation.y / 360) * 360,
        z: Math.round(rotation.z / 360) * 360,
    };
}

onDestroy(() => {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }
});
</script>

<svelte:head>
    <title>About</title>
    </svelte:head>

    <div class=" flex flex-col items-center justify-center space-y-6">
        <h2
            class="text-3xl font-bold text-center hover:rotate-x-15 hover:-rotate-y-15 transition ease-in-out cursor-pointer"
            >
            skxtch
        </h2>

        <!-- svelte-ignore a11y_img_redundant_alt -->
        <div
            role="presentation"
            class="[perspective:1000px] transition ease-in-out duration-100"
            on:mouseenter={startRotation}
            on:mouseleave={stopRotation}
            >
            <img
                src={data.avatarUrl}
                alt="Profile Picture"
                class="w-32 h-32 rounded-full shadow-lg border-4"
                style="transform: rotateX({rotation.x}deg) rotateY({rotation.y}deg) rotateZ({rotation.z}deg);
                transform-style: preserve-3d;
                transition: transform 50ms linear;"
                />
        </div>
        <p class="text-2xl max-w-md text-center">
            I am a 19-year-old from Morocco who enjoys developing things for fun and
            occasionally tackling difficult challenges.
        </p>

        <div class="w-full flex flex-col items-center justify-center">
          <h1 class="mb-4 text-3xl max-w-md text-center animate-pulse opacity-75">
            tools
          </h1>
        
          <div class="mb-4 flex flex-wrap items-center justify-center gap-8 transition ease-in-out invert">
            {#each logos as { name, component }}
              <div class="transition-transform duration-200 opacity-75 hover:opacity-100 hover:scale-110">
                <img src={component} alt={name} class="w-12 h-12" />
              </div>
            {/each}
          </div>
        
          <h1 class="mb-4 text-3xl text-center animate-pulse opacity-75">
            links
          </h1>
        
          <div class="flex flex-col md:flex-row flex-wrap items-center justify-center gap-4 w-full max-w-3xl mx-auto">
            {#each buttons as button}
              <a
                href={button.link}
                class="flex items-center justify-center gap-3 bg-navyblack px-6 py-3 rounded-lg text-white font-medium shadow-md
                       hover:scale-105 hover:invert transition ease-in-out
                       w-48 md:w-auto"
              >
                <img
                  src={button.icon}
                  alt={button.text + ' icon'}
                  class="w-5 h-5 filter brightness-15 invert"
                />
                <span class="text-sm md:text-base">{button.text}</span>
              </a>
            {/each}
          </div>
        </div>
        
    </div>
