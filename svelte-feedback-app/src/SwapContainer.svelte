<script lang="ts">
    import { Styles, Button } from "sveltestrap";
    import SwitchButton from "./SwitchButton.svelte";
    import type { Token } from "./Token";
    import TokenChooser from "./TokenChooser.svelte";

    let fromToken: Token = null;
    let fromAmount: number = 0;

    let toToken: Token = null;
    let toAmount = 0;
    export let tokens: Token[];

    $: buttonDisabled =
        fromAmount === null || fromAmount === undefined || fromAmount == 0;

    function swapTokens(_) {
        let intermediary = fromToken;
        let tAmount = fromAmount;
        fromToken = toToken;
        fromAmount = toAmount;
        toToken = intermediary;
        toAmount = tAmount;
    }
</script>

<Styles />
<div>
    <div class="card">
        <TokenChooser
            description="from"
            {tokens}
            bind:selected={fromToken}
            bind:amount={fromAmount}
        />
        <SwitchButton on:switch={swapTokens} />
        <TokenChooser
            description="to"
            {tokens}
            bind:selected={toToken}
            bind:amount={toAmount}
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
