<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    
    $: if ($page.status === 404) {
      goto('/');
    }
  </script>
  
  <p>Redirecting to homepage...</p>