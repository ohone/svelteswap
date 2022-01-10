import type { QuoteParams } from "./QuoteParams";
import type { Token } from "./Token";

export class SwapState {
    FromToken: Token | undefined;
    ToToken: Token | undefined;
    FromAmount: number | undefined;
    ToAmount: number | undefined;

    ToAmountChangedLast: boolean | undefined;

    IsComplete(): boolean {
        return (
            !!this.FromToken &&
            !!this.ToToken &&
            !!this.FromAmount &&
            !!this.ToAmount
        );
    }

    IsQueryable(backwards: boolean): boolean {
        return (
            !!this.FromToken &&
            !!this.ToToken &&
            (backwards ? !!this.ToAmount : !!this.FromAmount)
        );
    }

    SwapTokens() {
        let intermediary = this.FromToken;
        let tAmount = this.FromAmount;
        this.FromToken = this.ToToken;
        this.FromAmount = this.ToAmount;
        this.ToToken = intermediary;
        this.ToAmount = tAmount;
    }

    GetQuoteParams(backwards: boolean = false): QuoteParams | undefined {
        console.log("fromToken: " + !!this.FromToken);
        console.log("toToken: " + !!this.ToToken);
        console.log("fromAmount: " + !!this.FromAmount);
        console.log("toAmount: " + !!this.ToAmount);

        console.log("is queryable " + this.IsQueryable(backwards));
        if (this.IsQueryable(backwards)) {
            if (
                (!backwards && !this.ToAmountChangedLast) ||
                (!backwards && !this.ToAmountChangedLast)
            ) {
                console.log("toamountchangedlast: " + this.ToAmountChangedLast);
                console.log("backwards: " + backwards);
                return undefined;
            }
            return {
                FromToken: this.FromToken!,
                ToToken: this.ToToken!,
                Amount: backwards ? this.ToAmount! : this.FromAmount!,
            };
        }
    }
}
