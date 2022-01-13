<script lang="ts">
    import { Styles, Button } from "sveltestrap";
    import SwitchButton from "./SwitchButton.svelte";
    import type { Token } from "../models/Token";
    import TokenChooser from "./TokenChooser.svelte";
    import { UniswapApi } from "../models/Uniswap/UniswapApi";
    import { SwapState } from "../models/SwapState";

    let swapState = new SwapState();
    const uniswap = new UniswapApi();
    export let tokens: Token[];
    let buttonDisabled = true;
    $: {
        buttonDisabled = !swapState.IsComplete();
    }

    function onInput() {
        const query = swapState.RequiredQuery();
        if (query !== undefined) {
            uniswap.GetQuote(query).then((pairInfo) => {
                swapState.From.Token == query.ToToken
                    ? (swapState.From.Count = pairInfo.quote)
                    : (swapState.To.Count = pairInfo.quote);
            });
        }
    }

    function swapTokens(): SwapState {
        const state = new SwapState();
        state.From.Token = swapState.To.Token;
        state.From.Count = swapState.To.Count;
        state.To.Token = swapState.From.Token;
        state.To.Count = swapState.From.Count;
        return state;
    }

    function updateState(newState: SwapState) {
        swapState = newState;
    }
</script>

<Styles />
<div>
    <div class="card">
        <TokenChooser
            description="from"
            {tokens}
            onAmountChanged={onInput}
            onTokenChanged={onInput}
            bind:tokenCount={swapState.From}
        />
        <SwitchButton
            on:switch={() => {
                updateState(swapTokens());
            }}
            disabled={swapState.From.Token === undefined &&
                swapState.To.Token === undefined}
        />
        <TokenChooser
            description="to"
            {tokens}
            onAmountChanged={onInput}
            onTokenChanged={onInput}
            bind:tokenCount={swapState.To}
        />
        <Button bind:disabled={buttonDisabled}>swap</Button>
    </div>
</div>

<style>
    .card {
        max-width: 480px;
        position: relative;
        margin: auto;
        padding: 10px;
    }
</style>
