import type { ITokenListAdapter } from "./ITokenListAdapter";
import type { Token } from "./Token";

export class CoinGeckoTokenListAdapter implements ITokenListAdapter {
    Name: string = "CoinGecko"

    async GetTokenList(): Promise<Token[]> {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/list?include_platform=true');
        const text: any[] = JSON.parse(await res.text());
        const ethTokens: Token[] = text.filter(o => Object.prototype.hasOwnProperty.call(o.platforms, 'ethereum'));
        return ethTokens;
    }
}