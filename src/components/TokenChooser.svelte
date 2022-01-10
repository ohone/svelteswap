<script lang="ts">
  import type { Token } from "../models/Token";
  import Select from "svelte-select";
  import { logger } from "ethers";
  export let description: string;
  export let tokens: Token[];
  export let selected: Token | undefined;
  export let amount: number | undefined;
  export let onTokenChanged: undefined | (() => void);
  export let onAmountChanged: undefined | (() => void);
</script>

<div class="card">
  <h5 class="card-title">
    {description}
  </h5>
  <div class="selectcontainer">
    <div class="newselect">
      <Select
        containerClasses={"newselect"}
        bind:value={selected}
        isMulti={false}
        items={tokens}
        labelIdentifier={"symbol"}
        optionIdentifier={"address"}
        placeholder={"select a token"}
        on:select={(e) => {
          console.log(e);
          if (onTokenChanged) {
            console.log("onTokenChanged");
            console.log("amount: " + amount);
            onTokenChanged();
          }
        }}
      />
    </div>
    <input
      bind:value={amount}
      on:input={(e) => {
        console.log(e);
        if (onAmountChanged) {
          console.log("onAmountChanged");
          onAmountChanged();
        }
      }}
      min="0"
      disabled={selected === undefined}
      placeholder={selected === undefined
        ? "select a token"
        : "enter an amount"}
    />
  </div>
</div>

<style>
  .selectcontainer {
    display: flex;
  }
  input {
    flex-grow: 1;
  }
  .newselect {
    flex-grow: 2;
    padding-right: 5px;
  }
</style>
