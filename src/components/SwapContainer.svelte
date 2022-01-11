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

    $: {
    }

    function onInput(backwards: boolean) {
        //if (!swapState.ToAmount) {
        //    backwards = false;
        //}
        //const quoteParams = swapState.GetQuoteParams(backwards);
        //console.log(swapState);
        //console.log(
        //    "from " + quoteParams?.FromToken.symbol + " " + quoteParams?.Amount
        //);
        //console.log("to " + quoteParams?.ToToken.symbol);
        //if (quoteParams) {
        //    uniswap
        //        .GetQuote(quoteParams)
        //        .then((pairInfo) => {
        //            console.log(pairInfo);
        //            console.log(swapState);
        //            if (backwards) {
        //                console.log("updated for");
        //                swapState.FromAmount = pairInfo.quote;
        //            } else {
        //                console.log("updated to");
        //                swapState.ToAmount = pairInfo.quote;
        //            }
        //        })
        //        .catch((err) => {
        //            console.log(err);
        //            if (backwards) {
        //                swapState.FromAmount = undefined;
        //            } else {
        //                swapState.ToAmount = undefined;
        //            }
        //        });
        //}
    }

    function swapTokens(_: any = null): SwapState {
        const state = new SwapState();
        state.From.Token = swapState.To.Token;
        state.From.Count = swapState.To.Count;
        state.To.Token = swapState.To.Token;
        state.To.Count = swapState.To.Count;
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
            onTokenChanged={() => {
                onInput(false);
            }}
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
            onAmountChanged={() => {
                onInput(true);
            }}
            onTokenChanged={() => {
                onInput(true);
            }}
            bind:tokenCount={swapState.From}
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
