const tradesColorMapping = {
    buy: {
        color: 'var(--color-green)',
    },
    sell: {
        color: 'var(--color-red)',
    },
};
export const setTradeColor = (side) => tradesColorMapping[side] || { color: '' };