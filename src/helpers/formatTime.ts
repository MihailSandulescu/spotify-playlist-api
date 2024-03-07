/**
 * Convert millisecond time in readable format.
  * @param time - time to be formatted, in milliseconds
 * @param isSecond - boolean, set to true for conversion to seconds
 * @returns string hh:mm:ss - formatted time
 */

export default function formatTime(time: number, isSecond: boolean = false): string {
     return isSecond ? time.toString().slice(0,2).padEnd(2, "0") : time.toString().slice(0,2).padStart(2, "0");
 }