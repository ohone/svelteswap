import type { PairInfo } from "../PairInfo";
import type { QuoteParams } from "../QuoteParams";
import type { UniswapResponse } from "./UniswapResponse";

export class UniswapApi {
  async GetQuote(quote: QuoteParams): Promise<PairInfo> {
    const req = `https://api.uniswap.org/v1/quote?tokenInAddress=${
      quote.FromToken.address
    }&tokenInChainId=1&tokenOutAddress=${
      quote.ToToken.address
    }&tokenOutChainId=1&amount=${(
      quote.Amount *
      10 ** quote.FromToken.decimals
    ).toLocaleString("fullwide", {
      useGrouping: false,
    })}&type=exactIn&protocols=v3`;
    const res = await fetch(req);
    const response: UniswapResponse = JSON.parse(await res.text());

    if (response.errorCode) {
      return Promise.reject(`error ${response.errorCode}`);
    }

    // we dont do this here
    if (response.route.length == 0) {
      return Promise.reject("not tradeable pair");
    }

    const oneStepRoutes = response.route.filter((o) => o.length == 1);
    if (oneStepRoutes.length == 0) {
      return Promise.reject("not tradeable pair");
    }

    return {
      quoteGasAdjusted:
        +response.quoteGasAdjusted / 10 ** quote.ToToken.decimals,
      contractAddress: oneStepRoutes[0][0].address,
    };
  }
}
