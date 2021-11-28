import type { ITokenListProvider } from "./ITokenListProvider";
import type { Token } from "./Token";

export class YearnTokenListProvider implements ITokenListProvider {
    Name: string = "Yearn"

    async GetTokenList(): Promise<Token[]> {
        const res = await fetch('https://yearn.science/static/tokenlist.json');
        const response : any = JSON.parse(await res.text());
        const text: Token[] = response.tokens.flatMap((f: any) => {f.provider = this.Name; return f});
        return text;
    }
}