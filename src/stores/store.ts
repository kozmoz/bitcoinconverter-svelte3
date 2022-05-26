import { writable } from 'svelte/store';
import {CONVERT_DIR, CURRENCY} from "../domain/enums";

// Set defaults.
export const currency = writable(CURRENCY.EUR);
export const direction = writable(CONVERT_DIR.FROM_BTC);
export const amount = writable(1);
