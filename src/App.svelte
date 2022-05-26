<script lang="ts">
    import 'bootstrap/dist/css/bootstrap.min.css';
    import {CONVERT_DIR, CURRENCY} from "./domain/enums";
    import SelectCurrency from './components/SelectCurrency.svelte'
    import InputAmount from './components/InputAmount.svelte'
    import SelectConversionDirection from './components/SelectConversionDirection.svelte'
    import ConversionResult from './components/ConversionResult.svelte'

    let amount: number = 1;
    let currency: CURRENCY = CURRENCY.EUR;
    let direction: CONVERT_DIR = CONVERT_DIR.FROM_BTC;
</script>

<main>
    <div class="container">
        <div class="row">
            <div class="col converter-block-title text-center text-white">
                <h2>Svelte 3 TypeScript Bitcoin Converter</h2>
            </div>
        </div>

        <div class="row py-3 bg-light">
            <div class="col-sm-12 col-md-6">
                <form novalidate="novalidate" autocomplete="off">

                    <SelectCurrency bind:currency/>

                    <SelectConversionDirection bind:direction currency="{currency}"/>

                    <InputAmount bind:amount
                                 currency="{direction === CONVERT_DIR.FROM_BTC ? CURRENCY.BTC : currency}"/>

                </form>
            </div>

            <div class="col-sm-12 col-md-6 m-auto bg-light">
                <ConversionResult amount="{amount}" currency="{currency}" direction="{direction}"/>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <p>
                    Example Svelte3 TypeScript web application.
                </p>
            </div>
        </div>
    </div>
</main>

<style>
    :global(body) {
        margin: 0;
        padding: 1em;
    }

    :global(body > *) {
        max-width: 1024px;
    }

    .converter-block-title {
        background: linear-gradient(to bottom, #184791 0%, #00256f 100%);
    }

</style>