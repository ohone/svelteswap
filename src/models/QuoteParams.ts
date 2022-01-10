import type { Token } from "./Token";

export type QuoteParams = {
    FromToken: Token;
    ToToken: Token;
    Amount: number;
};
