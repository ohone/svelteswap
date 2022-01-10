<script lang="ts">
  import { Styles, Button, Form } from "sveltestrap";
  import SwitchButton from "./SwitchButton.svelte";
  import type { Token } from "../models/Token";
  import TokenChooser from "./TokenChooser.svelte";
  import { UniswapApi } from "../models/Uniswap/UniswapApi";
  import { SwapState } from "../models/SwapState";

  const swapState = new SwapState();
  const uniswap = new UniswapApi();
  export let tokens: Token[];
  let buttonDisabled = true;
  $: {
    buttonDisabled = !swapState.IsComplete();
  }

  function onInput(backwards: boolean) {
    if (!swapState.ToAmount) {
      backwards = false;
    }
    const quoteParams = swapState.GetQuoteParams(backwards);
    console.log(swapState);
    console.log(
      "from " + quoteParams?.FromToken.symbol + " " + quoteParams?.Amount
    );
    console.log("to " + quoteParams?.ToToken.symbol);
    if (quoteParams) {
      uniswap
        .GetQuote(quoteParams)
        .then((pairInfo) => {
          console.log(pairInfo);
          console.log(swapState);
          if (backwards) {
            console.log("updated for");
            swapState.FromAmount = pairInfo.quote;
          } else {
            console.log("updated to");
            swapState.ToAmount = pairInfo.quote;
          }
        })
        .catch((err) => {
          console.log(err);
          if (backwards) {
            swapState.FromAmount = undefined;
          } else {
            swapState.ToAmount = undefined;
          }
        });
    }
  }

  function swapTokens(_: any) {
    let intermediary = swapState.FromToken;
    let tAmount = swapState.FromAmount;
    swapState.FromToken = swapState.ToToken;
    swapState.FromAmount = swapState.ToAmount;
    swapState.ToToken = intermediary;
    swapState.ToAmount = tAmount;
    swapState.ToAmountChangedLast = !swapState.ToAmountChangedLast;
  }
</script>

<Styles />
<div>
  <div class="card">
    <TokenChooser
      description="from"
      {tokens}
      onAmountChanged={() => {
        swapState.ToAmountChangedLast = false;
        console.log("chooser1:amount: " + swapState.FromAmount);
        console.log("chooser1:token " + swapState.FromToken);
        onInput(false);
      }}
      onTokenChanged={() => {
        console.log("chooser1:amount: " + swapState.FromAmount);
        console.log("chooser1:token " + swapState.FromToken);
        onInput(false);
      }}
      bind:selected={swapState.FromToken}
      bind:amount={swapState.FromAmount}
    />
    <SwitchButton
      on:switch={swapTokens}
      disabled={swapState.FromToken === undefined &&
        swapState.ToToken === undefined}
    />
    <TokenChooser
      description="to"
      {tokens}
      onAmountChanged={() => {
        swapState.ToAmountChangedLast = true;
        console.log("chooser2:amount: " + swapState.FromAmount);
        console.log("chooser2:token " + swapState.FromToken);
        onInput(true);
      }}
      onTokenChanged={() => {
        console.log("chooser2:amount: " + swapState.FromAmount);
        console.log("chooser2:token " + swapState.FromToken);
        onInput(true);
      }}
      bind:selected={swapState.ToToken}
      bind:amount={swapState.ToAmount}
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
