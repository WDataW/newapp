export const isFutureDate = (date: Date): boolean => date > new Date();

export const getFutureDate = (dateOffset: number): Date => {// offset in days
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + dateOffset)
    return newDate;
}
export const getToday = (): Date => {
    const now: Date = new Date();
    const today: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return today;
}
export const getYesterday = (): Date => {
    const now: Date = new Date();
    const yesterday: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
}
export const getNextHour = (): Date => {
    const now: Date = new Date();
    now.setHours(now.getHours() + 1);
    return now;
}
export const normalize = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());