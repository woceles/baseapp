export const sortAsks = (asks) => {
    return asks.sort((a, b) => Number(a[0]) - Number(b[0]));
};
export const sortBids = (bids) => {
    return bids.sort((a, b) => Number(b[0]) - Number(a[0]));
};