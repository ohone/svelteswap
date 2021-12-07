export interface Token {
    symbol: string;
    id: string | undefined;
    name: string | undefined; 
    address: string;
    provider: string | undefined;
    decimals: number;
}