<script lang="ts">
    export let description: string;
    export let tokens = [];
    export let selected;
    export let amount = 0;
</script>

<div class="card">
    <h5 class="card-title">
        {description}
    </h5>
    <select bind:value={selected}>
        {#each tokens as token}
            <option value={token}>
                {token.symbol}
            </option>
        {/each}
    </select>
    <input type="number" bind:value={amount} min="0" />
</div>
