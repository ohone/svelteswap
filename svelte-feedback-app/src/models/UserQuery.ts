import type { Token } from "./Token";

export class UserQuery{
    FromToken : Token | undefined;
    ToToken : Token | undefined;
    Amount : number | undefined;

    IsComplete() : boolean {
        return !!this.FromToken && !!this.ToToken && !!this.Amount;
    }

    GetQuoteParams() : QuoteParams | undefined {
        if (this.IsComplete()){
            return {
                FromToken : this.FromToken!,
                ToToken : this.ToToken!,
                Amount : this.Amount!
            }
        }
    }
}

export type QuoteParams = {
    FromToken : Token,
    ToToken : Token,
    Amount : number
}