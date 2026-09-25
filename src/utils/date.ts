export const isFutureDate = (date: Date): boolean => date > new Date();
export const dateOfInvocation = (): Date => new Date();

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
export const normalize = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());