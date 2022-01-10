import type { ITokenListProvider as ITokenListProvider } from "./ITokenListProvider";
import type { Token } from "../Token";

export class StandardTokenListProvider implements ITokenListProvider {
    Name: string;
    Url: string;
    constructor(url: string, name: string) {
        this.Name = name;
        this.Url = url;
    }
    async GetTokenList(): Promise<Token[]> {
        const res = (await fetch(this.Url));
        const text: any[] = JSON.parse((await res.text())).tokens;
        return text
            .map(t => { t.provider = this.Name; return t; });
    }
}