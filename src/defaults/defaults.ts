import { Currency } from "../model/dtos/dto";

export const currencies: Currency[] = [
    {
        name: "Angolan kwanza",
        code: "AOA",
        symbol: "Kz"
    },
    {
        name: "United States dollar",
        code: "USD",
        symbol: "$"
    },
    {
        name: "euro",
        code: "EUR",
        symbol: "€"
    },
    {
        name: "british pound",
        code: "GBP",
        symbol: "£"
    },
    {
        name: "South African Rand",
        code: "ZAR",
        symbol: "R"
    },
    {
        name: "Japan yen",
        code: "JPY",
        symbol: "¥"
    },
    {
        name: "Brazilian real",
        code: "BRL",
        symbol: "R$"
    },
    {
        name: "Chinese yuan",
        code: "CNY",
        symbol: "¥"
    },
    {
        name: "Nigerian naira",
        code: "NGN",
        symbol: "₦"
    },
    {
        name: "Mozambican metical",
        code: "MZN",
        symbol: "MT"
    },
    {
        name: "Indian rupee",
        code: "INR",
        symbol: "₹"
    },
    {
        name: "bitcoin",
        code: "BTC",
        symbol: "₿"
    }
]
export const currenciesQuery = "AOA,GBP,EUR,USD,ZAR,BTC,INR,MZN,NGN,CNY,BRL,JPY"
