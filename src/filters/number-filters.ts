export function roundFilter(value: number, decimals: number): string {
    if ((value !== 0 && !value) || !value.toFixed) {
        return '';
    }
    return value.toFixed(decimals || 2);
}
