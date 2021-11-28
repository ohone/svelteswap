import type { Token } from "../Token";

export interface ITokenListProvider {
    GetTokenList: () => Promise<Token[]>
    readonly Name: string
}