<script lang="ts">
    import {CONVERT_DIR, CURRENCY, LOADING_STATUS} from "../domain/enums";
    import {timeFilter} from '../filters/date-filters';
    import {roundFilter} from '../filters/number-filters';
    import type {TickerPrice} from "../types/TickerPrice";
    import {TickerService} from "../services/TickerService";
    import {onDestroy, onMount} from 'svelte';

    // Component properties.
    export let amount: number;
    export let currency: CURRENCY;
    export let direction: CONVERT_DIR;

    let loadingError: string = '';
    let loadingStatus: LOADING_STATUS = LOADING_STATUS.NOT_LOADING;
    let tickerPrice: TickerPrice;
    let calculatedResult: number;

    // (re)calculate the price when the amount or ticker price changes.
    $: {
        if (!amount || !currency || !direction || !tickerPrice) {
            calculatedResult = 0;
        } else if (direction === CONVERT_DIR.FROM_BTC) {
            calculatedResult = currency === CURRENCY.EUR ? amount * tickerPrice.rateEUR : amount * tickerPrice.rateUSD;
        } else {
            calculatedResult = currency === CURRENCY.EUR ? amount / tickerPrice.rateEUR : amount / tickerPrice.rateUSD;
        }
    }

    /**
     * Load the ticker prices.
     */
    async function loadPrices(): Promise<void> {
        loadingStatus = LOADING_STATUS.LOADING;
        try {
            tickerPrice = await TickerService.loadTickerPrice() as TickerPrice;
            loadingError = '';
            loadingStatus = LOADING_STATUS.NOT_LOADING;
        } catch (error) {
            loadingError = error;
            loadingStatus = LOADING_STATUS.ERROR;
        }
    }

    /**
     * Update the BTC price on interval.
     */
    onMount(() => {
        loadPrices();
        const cancelId = setInterval(loadPrices, 60000);
        return () => clearInterval(cancelId);
    });

</script>

<div class="converter-block-result bg-white text-center px-3 py-3 my-3">
    {#if tickerPrice}
        <h3>
            {#if direction === CONVERT_DIR.TO_BTC}
                {currency} { amount || 0 } = {roundFilter(calculatedResult, 5) } BTC
            {/if}
            {#if direction === CONVERT_DIR.FROM_BTC}
                {amount || 0 } BTC = {roundFilter(calculatedResult, 2) }
                {currency}
            {/if}
        </h3>

        <p class="mb-0">
            <small class="text-muted">The exchange rate updates every minute</small>
        </p>

        <p class="mb-0">
            <small class="text-muted">
                Last update at
                {timeFilter(tickerPrice.updated) }, 1 BTC =
                {currency}
                {roundFilter(tickerPrice[`rate${currency}`], 2) } (buy)
            </small>
        </p>
    {/if}

    {#if loadingStatus === LOADING_STATUS.LOADING}
        <div>Loading/updating exchange rates...</div>
    {/if}

    {#if loadingError}
        <div class="alert alert-danger mb-0" role="alert">loadingError</div>
    {/if}
</div>


<style>

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    .converter-block-result {
        border: 3px solid #00256f;
        border-radius: 10px;
    }

</style>
