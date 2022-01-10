<script lang="ts">
  import type { ITokenListProvider } from "../models/TokenListProviders/ITokenListProvider";

  import type { Token } from "../models/Token";
  import { CoinGeckoTokenListProvider } from "../models/TokenListProviders/CoinGeckoTokenListProvider";
  import { StoreWrappedTokenListProvider } from "../models/TokenListProviders/StoreWrappedTokenListProvider";
  import { YearnTokenListProvider } from "../models/TokenListProviders/YearnTokenListProvider";
  import { GeminiTokenListProvider } from "../models/TokenListProviders/GeminiTokenListProvider";
  import { KyberTokenListProvider } from "../models/TokenListProviders/KyberTokenListProvider";
  import { onMount } from "svelte";
  export let tokens: Token[];
  let tokenLists: [list: ITokenListProvider, enabled: boolean][] = [
    [
      new StoreWrappedTokenListProvider(new CoinGeckoTokenListProvider()),
      false,
    ],
    [new StoreWrappedTokenListProvider(new YearnTokenListProvider()), false],
    [new StoreWrappedTokenListProvider(new GeminiTokenListProvider()), false],
    [new StoreWrappedTokenListProvider(new KyberTokenListProvider()), true],
  ];

  function TokenListToTokens(tokenList: ITokenListProvider): Promise<Token[]> {
    return tokenList.GetTokenList().catch((ex) => {
      console.log(tokenList.Name + ex);
      return new Array<Token>();
    });
  }

  function TokensUniqueByAddress(tokens: Token[]): Token[] {
    const arr: Token[] = [];
    const map = new Map();
    for (const item of tokens.filter((f) => f.address)) {
      if (!map.has(item.address)) {
        map.set(item.address, true);
        arr.push(item);
      }
    }
    return arr;
  }

  function generateTokens(): void {
    let tokenFetchPromises = tokenLists
      .filter(([_, enabled]) => enabled)
      .flatMap(([list, _]) => TokenListToTokens(list));

    Promise.all(tokenFetchPromises).then((p) => {
      tokens = TokensUniqueByAddress(p.flat());
    });
  }

  function filterTokens(providerName: string, enabled: boolean): void {
    if (enabled) {
      const enabledLists = tokenLists
        .filter(([list, _]) => list.Name === providerName)
        .flatMap(([list, _]) => TokenListToTokens(list));

      Promise.all(enabledLists).then((tk) => {
        tokens = [...tokens, ...TokensUniqueByAddress(tk.flat())];
      });
    } else {
      tokens = tokens.filter((o) => o.provider !== providerName);
    }
  }
  onMount(async () => await generateTokens());
</script>

<div class="card">
  <h5 class="card-title">Selec token lists</h5>
  {#each tokenLists as [list, enabled]}
    <label>
      <input
        type="checkbox"
        bind:checked={enabled}
        on:change={(_) => filterTokens(list.Name, enabled)}
      />
      {list.Name}
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
