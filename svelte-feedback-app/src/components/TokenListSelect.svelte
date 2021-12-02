<script lang="ts">
    import type { ITokenListProvider } from "../models/TokenListProviders/ITokenListProvider";

    import type { Token } from "../models/Token";
    import { CoinGeckoTokenListProvider } from "../models/TokenListProviders/CoinGeckoTokenListProvider";
    import { StoreWrappedTokenListProvider } from "../models/TokenListProviders/StoreWrappedTokenListProvider";
    import { YearnTokenListProvider } from "../models/TokenListProviders/YearnTokenListProvider";
    export let tokens: Token[];
    let tokenLists: [list: ITokenListProvider, enabled: boolean][] = [
        [
            new StoreWrappedTokenListProvider(new CoinGeckoTokenListProvider()),
            false,
        ],
        [new StoreWrappedTokenListProvider(new YearnTokenListProvider()), true],
    ];

    function TokenListToTokens(
        tokenList: ITokenListProvider
    ): Promise<Token[]> {
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
            .filter(([_,enabled]) => enabled)
            .flatMap(([list,_]) => TokenListToTokens(list));

        Promise.all(tokenFetchPromises).then((p) => {
            tokens = TokensUniqueByAddress(p.flat());
        });
    }

    function filterTokens(providerName: string, include: boolean): void {
        if (include) {
            Promise.all(
                tokenLists
                    .filter(([list,_]) => list.Name === providerName)
                    .flatMap((o) => TokenListToTokens(o[0]))
            ).then((p) => {
                tokens = [...tokens, ...TokensUniqueByAddress(p.flat())];
            });
        } else {
            tokens = tokens.filter((o) => o.provider !== providerName);
        }
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
                on:change={(_) => filterTokens(tokenList[0].Name, tokenList[1])}
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
