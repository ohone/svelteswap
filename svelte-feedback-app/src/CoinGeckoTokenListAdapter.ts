import type { ITokenListProvider as ITokenListProvider } from "./ITokenListProvider";
import type { Token } from "./Token";

export class CoinGeckoTokenListProvider implements ITokenListProvider {
    Name: string = "CoinGecko"

    async GetTokenList(): Promise<Token[]> {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/list?include_platform=true');
        const text: any[] = JSON.parse(await res.text());
        return text.filter(o => Object.prototype.hasOwnProperty.call(o.platforms, 'ethereum'))
            .flatMap(t => { t.address = t.platforms.ethereum; t.provider = this.Name; return t; });
    }
}