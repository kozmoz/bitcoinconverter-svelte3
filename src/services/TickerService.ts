import type {TickerPrice} from "../types/TickerPrice";

// noinspection SpellCheckingInspection
/**
 * Part of the Coindesk API response.
 *
 * https://www.coindesk.com/coindesk-api
 * https://www.coindesk.com/price/bitcoin
 */
export interface CoindeskBpiCurrentPrice {
    time: {
        /** Time in format '2013-09-18T17:27:00+00:00'. */
        updatedISO: string
    },
    bpi: {
        EUR: {rate_float: number},
        USD: {rate_float: number}
    }
}

/**
 * Moved to separate service so we can have a promise with return types (when using TypeScript).
 */
export class TickerService {

    /**
     * Get the BTC price for both EUR and USD.
     *
     * @return The response with the date and prices or in case of error the error description
     */
    public static loadTickerPrice(): Promise<TickerPrice|string> {
        return new Promise(function (resolve, reject) {
            fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                    return response.json();
                })
                .then((response: CoindeskBpiCurrentPrice) => {
                    resolve({
                        updated: new Date(response.time.updatedISO),
                        rateEUR: response.bpi.EUR.rate_float,
                        rateUSD: response.bpi.USD.rate_float
                    });
                })
                .catch((error: Error) => {
                    reject(`${error.message}`);
                });
        });
    }
}
