<script lang="ts">
    import { Styles, Button } from 'sveltestrap';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function switchTokens() {
        dispatch('switch',{});
    }
</script>

<div>
    <Button on:click={switchTokens}>⬇️</Button>
</div>

<Styles/>