<script lang="ts">
import { Styles, Button } from 'sveltestrap';
import SwitchButton from "./SwitchButton.svelte";
import TokenChooser from "./TokenChooser.svelte";

let fromToken = null;
let fromAmount : number = 0;

let toToken = null;
let toAmount = 0;

async function getTokens(){
    const res = await fetch('https://api.coingecko.com/api/v3/coins/list?include_platform=true');
    const text = JSON.parse(await res.text());
    const ethTokens = text.filter(o => Object.prototype.hasOwnProperty.call(o.platforms,'ethereum'));
    return ethTokens;
}

let tokenListPromise = getTokens();
$: buttonDisabled = fromAmount === null || fromAmount === undefined || fromAmount == 0;

function swapTokens(event){
    let intermediary = fromToken;
    let tAmount = fromAmount;
    fromToken = toToken;
    fromAmount = toAmount;
    toToken = intermediary;
    toAmount = tAmount;
}
</script>
<Styles/>
<div>
    {#await tokenListPromise}
        <p>loading tokens...</p>
    {:then tokenList}
    <div class="card">
        <TokenChooser description='from' tokens={tokenList} bind:selected={fromToken} bind:amount={fromAmount}></TokenChooser>
        <SwitchButton on:switch={swapTokens}></SwitchButton>
        <TokenChooser description='to' tokens={tokenList} bind:selected={toToken} bind:amount={toAmount}></TokenChooser>
        <Button bind:disabled={buttonDisabled}>swap</Button>
    </div>
    {:catch error}
        <p>{error.message}</p>
    {/await}

</div>

<style>
    .card {
        max-width: 480px;
        position: relative;
        margin: auto;
    }
</style>