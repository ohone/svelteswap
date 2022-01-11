import type { QuoteParams } from "./QuoteParams";
import { TokenCount } from "./TokenCount";

export class SwapState {
    /**
     *
     */
    constructor() {
        this.From = new TokenCount();
        this.To = new TokenCount();
    }

    readonly From: TokenCount;
    readonly To: TokenCount;

    IsComplete(): boolean {
        return (
            (this.From?.IsComplete() ?? false) &&
            (this.To?.IsComplete() ?? false)
        );
    }

    RequiredQuery(): QuoteParams | undefined {
        if (this.From !== undefined && this.From.IsComplete()) {
            if (this.To.Token !== undefined) {
                return {
                    FromToken: this.From.Token!,
                    ToToken: this.To.Token,
                    Amount: this.From.Count!,
                };
            }
        }
        if (this.To !== undefined && this.To.IsComplete()) {
            if (this.From.Token !== undefined) {
                return {
                    FromToken: this.To.Token!,
                    ToToken: this.From.Token,
                    Amount: this.To.Count!,
                };
            }
        }
    }
}
