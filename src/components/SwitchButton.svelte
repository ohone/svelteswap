<script lang="ts">
  import { Styles, Button } from "sveltestrap";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export var disabled: boolean = true;
  function switchTokens() {
    dispatch("switch", {});
  }
</script>

<div>
  <Button on:click={switchTokens} {disabled}>switch 🔃</Button>
</div>

<Styles />
