<script lang="ts">
    import { onMount } from 'svelte';
  
    export let texts: string[] = [""];
    export let typingSpeed: number = 100;
    export let deletingSpeed: number = 50;
    export let pauseBetween: number = 2000;
    export let loop: boolean = true;
    export let cursor: boolean = true;
    export let cursorBlinkSpeed: number = 500;
  
    let displayedText = '';
    let currentTextIndex = 0;
    let isDeleting = false;
    let isTyping = false;
    let timer: number;
  
    onMount(() => {
      const type = () => {
        isTyping = true;
        const currentText = texts[currentTextIndex];
  
        if (isDeleting) {
          displayedText = currentText.substring(0, displayedText.length - 1);
        } else {
          displayedText = currentText.substring(0, displayedText.length + 1);
        }
  
        let delta = isDeleting ? deletingSpeed : typingSpeed;
  
        if (!isDeleting && displayedText === currentText) {
          delta = pauseBetween;
          isDeleting = true;
        } else if (isDeleting && displayedText === '') {
          isDeleting = false;
          if (currentTextIndex < texts.length - 1) {
            currentTextIndex++;
          } else if (loop) {
            currentTextIndex = 0;
          } else {
            isTyping = false;
            return;
          }
          delta = typingSpeed;
        }
  
        timer = window.setTimeout(type, delta);
      };
  
      timer = window.setTimeout(type, typingSpeed);
  
      return () => window.clearTimeout(timer);
    });
  </script>
  
  <div class="inline-flex items-center font-instrumentsans text-shadow-lg">
    <span class="whitespace-nowrap">{displayedText}</span>
    {#if cursor && isTyping}
      <span 
        class="ml-0.5 h-6 w-0.5 bg-current animate-blink" 
        style={`animation-duration: ${cursorBlinkSpeed}ms`}
      ></span>
    {/if}
  </div>
  
  <style>
    @keyframes blink {
      0%, 100% { opacity: 1 }
      50% { opacity: 0 }
    }
    .animate-blink {
      animation: blink step-end infinite;
    }
  </style>