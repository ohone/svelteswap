import type { ITokenListProvider } from "./ITokenListProvider";
import type { Token } from "./Token";

export class StoreWrappedTokenListProvider implements ITokenListProvider {

    private cache: Token[] | undefined;
    private inner: ITokenListProvider;

    constructor(inner: ITokenListProvider) {
        this.inner = inner;
        this.Name = inner.Name;
    }

    readonly GetTokenList: () => Promise<Token[]> = () => {
        return this.WrapCall(() => this.inner.GetTokenList());
    }

    Name: string;

    private async WrapCall(inner: () => Promise<Token[]>): Promise<Token[]> {
        if (this.cache) {
            return Promise.resolve(this.cache);
        }
        this.cache = await inner();
        return this.cache;
    }
}