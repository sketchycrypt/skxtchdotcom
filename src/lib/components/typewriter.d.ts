declare module '$lib/components/Typewriter.svelte' {
    import type { SvelteComponentTyped } from 'svelte';
    
    interface TypewriterProps {
      texts?: string[];
      typingSpeed?: number;
      deletingSpeed?: number;
      pauseBetween?: number;
      loop?: boolean;
      cursor?: boolean;
      cursorChar?: string;
      cursorBlinkSpeed?: number;
    }
    
    export default class Typewriter extends SvelteComponentTyped<TypewriterProps> {}
  }