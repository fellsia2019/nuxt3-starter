export const countNumberFromIndex = (index: number): string | number => {
    return index + 1 > 9 ? index + 1 : '0' + (index + 1);
};
