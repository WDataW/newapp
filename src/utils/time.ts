export const second: number = 1000; // ms
export const minute: number = 60 * second;
export const hour: number = 60 * minute;
export const day: number = 24 * hour;
export const month: number = 30 * day;
export const dateToUnixSeconds: (date: Date) => number// to JWT exp
    = (date: Date) => Math.floor(date.getTime() / 1000);
export const msToMinute = (ms: number): number => ms / 60000;
