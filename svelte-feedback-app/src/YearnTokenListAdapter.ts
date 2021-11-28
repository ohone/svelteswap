import type { ITokenListAdapter } from "./ITokenListAdapter";
import type { Token } from "./Token";

export class YearnTokenListAdapter implements ITokenListAdapter {
    Name: string = "Yearn"

    async GetTokenList(): Promise<Token[]> {
        const res = await fetch('https://yearn.science/static/tokenlist.json');
        const response : any = JSON.parse(await res.text());
        const text: Token[] = response.tokens;
        return text;
    }
}