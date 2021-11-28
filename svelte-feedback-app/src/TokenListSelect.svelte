<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import { CoinGeckoTokenListAdapter } from "./CoinGeckoTokenListAdapter";
    import type { ITokenListAdapter } from "./ITokenListAdapter";
    import type { Token } from "./Token";
    export let tokens: Token[];
    let tokenLists: [ITokenListAdapter, boolean][] = [
        [new CoinGeckoTokenListAdapter(), true],
    ];

    function generateTokens() {
        tokens.length = 0;

        let tokenFetchPromises: Array<Promise<Token[]>> = tokenLists
            .filter((o) => o[1])
            .flatMap((o) => o[0].GetTokenList())
            .reduce((sum, current) => {
                sum.push(current);
                return sum;
            }, []);

        Promise.all(tokenFetchPromises).then((p) => {
            tokens = [...tokens, ...p.flat()];
        });
    }

    generateTokens();
</script>

<div class="card">
    <h5 class="card-title">Selec token lists</h5>
    {#each tokenLists as tokenList}
        <label>
            <input
                type="checkbox"
                bind:checked={tokenList[1]}
                on:change={generateTokens}
            />
            {tokenList[0].Name}
        </label>
    {/each}
</div>

<style>
    .card {
        max-width: 480px;
        position: relative;
        margin: auto;
        padding: 10px;
    }
</style>
