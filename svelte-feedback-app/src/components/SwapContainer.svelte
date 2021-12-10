<script lang="ts">
  import { Styles, Button } from "sveltestrap";
  import SwitchButton from "./SwitchButton.svelte";
  import type { Token } from "../models/Token";
  import TokenChooser from "./TokenChooser.svelte";
  import { UniswapApi } from "../models/Uniswap/UniswapApi";
  import { UserQuery } from "../models/UserQuery";
  import type { PairInfo } from "../models/PairInfo";

  const userQuery = new UserQuery();
  const uniswap = new UniswapApi();
  let quote: PairInfo | undefined;
  let toAmount: number | undefined;
  export let tokens: Token[];

  let buttonDisabled = true;
  $: {
    buttonDisabled = !quote;
  }

  $: {
    const quoteParams = userQuery.GetQuoteParams();
    if (quoteParams) {
      uniswap
        .GetQuote(quoteParams)
        .then((pairInfo) => {
          toAmount = pairInfo.quoteGasAdjusted;
          quote = pairInfo;
        })
        .catch((err) => {
          console.log(err);
          toAmount = undefined;
          quote = undefined;
        });
    }
  }

  function swapTokens(_: any) {
    let intermediary = userQuery.FromToken;
    let tAmount = userQuery.Amount;
    userQuery.FromToken = userQuery.ToToken;
    userQuery.Amount = toAmount;
    userQuery.ToToken = intermediary;
    toAmount = tAmount;
  }
</script>

<Styles />
<div>
  <div class="card">
    <TokenChooser
      description="from"
      {tokens}
      bind:selected={userQuery.FromToken}
      bind:amount={userQuery.Amount}
    />
    <SwitchButton on:switch={swapTokens} />
    <TokenChooser
      description="to"
      {tokens}
      bind:selected={userQuery.ToToken}
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
