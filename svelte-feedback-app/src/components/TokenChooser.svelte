<script lang="ts">
    import type { Token } from "../models/Token";

    export let description: string;
    export let tokens: Token[];
    export let selected: Token | undefined;
    export let amount = 0;
</script>

<div class="card">
    <h5 class="card-title">
        {description}
    </h5>
    <select bind:value={selected}>
        {#each tokens.sort(function (a, b) {
            if (a.symbol < b.symbol) {
                return -1;
            }
            if (a.symbol > b.symbol) {
                return 1;
            }
            return 0;
        }) as token (token.address)}
            <option value={token}>
                {token.symbol}
            </option>
        {/each}
    </select>
    <input type="number" bind:value={amount} min="0" />
</div>
