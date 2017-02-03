export interface ICurrency {
    symbol : string;
    name : string;
    symbol_native : string;
    decimal_digits: number;
    rounding : number;
    code : string;
    name_plural: string;

    isMatch(currency: Currency): boolean;    
}

export class Currency {
    symbol : string;
    name : string;
    symbol_native : string;
    decimal_digits: number;
    rounding : number;
    code : string;
    name_plural: string;

    isMatch(currency: Currency): boolean
    {
        return currency && currency.code == this.code;
    }
}