<script lang="ts">
    import {CURRENCY, CURRENCIES} from '../domain/enums';

    // Component property.
    export let currency: string;

    const CURRENCY_LABELS = {};
    CURRENCY_LABELS[CURRENCY.EUR] = 'Euro €';
    CURRENCY_LABELS[CURRENCY.USD] = 'US Dollar $';
</script>

<div class="form-group row">
    <label class="col-sm-3 col-form-label" for="currencyField">Currency</label>
    <div class="col-sm-9">
        <select id="currencyField" bind:value="{currency}" class="form-control">
            {#each CURRENCIES as c}
                <option value={c}>{CURRENCY_LABELS[c]}</option>
            {/each}
        </select>
    </div>
</div>

