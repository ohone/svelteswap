import type { Token } from "./Token";

export class TokenCount {
    Token: Token | undefined;
    Count: number | undefined;

    IsComplete(): boolean {
        return this.Token !== undefined && this.Count !== undefined;
    }
}
