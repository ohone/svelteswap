import type { PairInfo } from "./PairInfo";
import type { Token } from "./Token";
import type { UniswapResponse } from "./UniswapResponse";

export class UniswapApi {

    async GetQuote(fromToken: Token, toToken: Token, fromAmount: number): Promise<PairInfo> {
        const req = `https://api.uniswap.org/v1/quote?tokenInAddress=${fromToken.address}&tokenInChainId=1&tokenOutAddress=${toToken.address}&tokenOutChainId=1&amount=${fromAmount * (10 ** fromToken.decimals)}&type=exactIn&protocols=v3`
        const res = await fetch(req);
        const response: UniswapResponse = JSON.parse(await res.text());
        
        if (response.errorCode){
            return Promise.reject(`error ${response.errorCode}`)
        }

        // we dont do this here
        if (response.route.length == 0)
        {
            return Promise.reject('not tradeable pair')
        }

        const oneStepRoutes = response.route.filter(o => o.length == 1);
        if (oneStepRoutes.length == 0){
            return Promise.reject('not tradeable pair')
        }

        return {
            quoteGasAdjusted: +response.quoteGasAdjusted / (10 ** toToken.decimals), 
            contractAddress: oneStepRoutes[0][0].address
        };
    }
}