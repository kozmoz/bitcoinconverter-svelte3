<script lang="ts">
    import {CONVERT_DIR, CURRENCY} from '../domain/enums';

    export let direction: string;
    export let currency: CURRENCY;

    const DIRECTION_LABELS = {};
    DIRECTION_LABELS[CONVERT_DIR.FROM_BTC] = 'Convert from Bitcoin to {currency}';
    DIRECTION_LABELS[CONVERT_DIR.TO_BTC] = 'Convert from {currency} to Bitcoin';

    const CURRENCY_LABELS = {};
    CURRENCY_LABELS[CURRENCY.EUR] = 'Euro €';
    CURRENCY_LABELS[CURRENCY.USD] = 'US Dollar $';

</script>

<div class="form-group row">
    <legend class="col-form-label col-sm-3 pt-0">
        Direction
    </legend>
    <div class="col-sm-9">
        {#each Object.keys(CONVERT_DIR) as d}
            <div class="form-check">
                <input type="radio"
                       value="{d}"
                       bind:group="{direction}"
                       id="{`direction-${d}`}"
                       class="form-check-input"
                />
                <label for="{`direction-${d}`}" class="form-check-label">
                    {DIRECTION_LABELS[d].replace('{currency}', CURRENCY_LABELS[currency])}
                </label>
            </div>
        {/each}
    </div>
</div>
