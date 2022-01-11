import type { Token } from "./Token";

export interface ITokenCount {
    Token: Token;
    Count: number | undefined;
}

export class TokenCount {
    Token: Token | undefined;
    Count: number | undefined;

    IsComplete(): boolean {
        return this.Token !== undefined && this.Count !== undefined;
    }
}
