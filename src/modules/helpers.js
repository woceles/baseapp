const makerTypeMap = {
    ask: 'sell',
    bid: 'buy',
};
export const kindToMakerType = (kind) => makerTypeMap[kind];