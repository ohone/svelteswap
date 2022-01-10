import { StandardTokenListProvider } from "./StandardTokenListProvider";

export class KyberTokenListProvider extends StandardTokenListProvider {
    constructor() {
        super('https://api.kyber.network/tokenlist', "Kyber");
    }
}