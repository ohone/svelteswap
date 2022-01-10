import { StandardTokenListProvider } from "./StandardTokenListProvider";

export class GeminiTokenListProvider extends StandardTokenListProvider {
    constructor() {
        super('https://www.gemini.com/uniswap/manifest.json', "Gemini");
    }
}