<script lang="ts">
    import type { ITokenListProvider } from "../models/TokenListProviders/ITokenListProvider";

    import type { Token } from "../models/Token";
    import { CoinGeckoTokenListProvider } from "../models/TokenListProviders/CoinGeckoTokenListProvider";
    import { StoreWrappedTokenListProvider } from "../models/TokenListProviders/StoreWrappedTokenListProvider";
    import { YearnTokenListProvider } from "../models/TokenListProviders/YearnTokenListProvider";
    export let tokens: Token[];
    let tokenLists: [ITokenListProvider, boolean][] = [
        [
            new StoreWrappedTokenListProvider(new CoinGeckoTokenListProvider()),
            false,
        ],
        [new StoreWrappedTokenListProvider(new YearnTokenListProvider()), true],
    ];

    async function TokenListsToTokens(
        tokenLists: [ITokenListProvider, boolean][]
    ): Promise<Token[]> {
        const p = await Promise.all<Token[]>(
            tokenLists
                .flatMap((o) => o[0].GetTokenList())
                .reduce((sum, current) => {
                    sum.push(current);
                    return sum;
                }, [])
        );
        return p.flat();
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
        let tokenFetchPromises = TokenListsToTokens(
            tokenLists.filter((o) => o[1])
        );

        tokenFetchPromises.then((p) => {
            tokens = TokensUniqueByAddress(p);
        });
    }

    function filterTokens(providerName: string, include: boolean): void {
        if (include) {
            let tokenFetchPromises = TokenListsToTokens(
                tokenLists.filter((o) => o[0].Name === providerName)
            );

            tokenFetchPromises.then((p) => {
                tokens = [...tokens, ...TokensUniqueByAddress(p)];
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
