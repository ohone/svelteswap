export interface UniswapResponse {
    blockNumber: string | undefined;
    amount: string | undefined;
    amountDecimals: string | undefined;
    quote: string;
    quoteDecimals: string | undefined;
    quoteGasAdjusted: string;
    quoteGasAdjustedDecimals: string | undefined;
    gasUseEstimateQuote: string | undefined;
    gasUseEstimateQuoteDecimals: string | undefined;
    gasUseEstimate: string | undefined;
    gasUseEstimateUSD: string | undefined;
    gasPriceWei: string | undefined;
    route: any[][];
    routeString: string | undefined;
    quoteId: string | undefined;
    errorCode: string | undefined;
}
