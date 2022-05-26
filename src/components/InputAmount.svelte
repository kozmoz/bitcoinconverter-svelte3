<script lang="ts">
    import {CURRENCY} from "../domain/enums";

    // Component properties.
    export let currency: CURRENCY;
    export let amount: number;

    let modelValue: string = '' + amount;
    $: isValid = modelValue && isNumeric(modelValue);

    /**
     * Tests if the given value is numeric.
     *
     * @param value The string value to test
     * @returns The number or 0 if not recognized as number
     */
    function isNumeric(value: string): number {
        return /^\d+$/.test(value) ? parseInt(value, 10) : 0;
    }

    /**
     * Test if given value is valid.
     */
    function updateValue() {
        if (isValid) {
            amount = parseInt(modelValue, 10);
        }
    }

</script>

<template>
    <div class="form-group row">
        <label class="col-sm-3 col-form-label" for="amount">Amount</label>
        <div class="col-sm-9">
            <div class="input-group w-75">
                <div class="input-group-prepend">
                    <span class="input-group-text">{currency}</span>
                </div>

                <input id="amount"
                       type="text"
                       bind:value={modelValue}
                       maxlength="10"
                       class="form-control"
                       class:is-invalid="{!isValid}"
                       on:input="{updateValue}"
                />
                {#if modelValue && !isValid}
                    <div class="invalid-feedback">Only numbers are allowed</div>
                {/if}
                {#if !modelValue}
                    <div class="invalid-feedback">The amount is required</div>
                {/if}
            </div>
            <small class="form-text text-muted">The amount should be an integer</small>

        </div>
    </div>
</template>
