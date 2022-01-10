//https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png

export function GetTokenIconAddress(tokenAddress: string): string {
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/=${tokenAddress}/logo.png`;
}
