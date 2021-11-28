import type { Token } from "./Token";

export interface ITokenListAdapter {
    GetTokenList: () => Promise<Token[]>
    readonly Name: string
}