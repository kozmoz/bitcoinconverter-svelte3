/**
 * Filter that shows the time as HH:mm.
 *
 * @param date The date-time object
 * @return The time in HH:mm format or empty string
 */
export function timeFilter(date: Date): string {
    if (!date) {
        return '';
    }
    return ('00' + date.getHours()).slice(-2) + ':' + ('00' + date.getMinutes()).slice(-2);
}