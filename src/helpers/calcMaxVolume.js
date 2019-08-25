import { accumulateVolume } from './accumulateVolume';
export const calcMaxVolume = (bids, asks) => {
    return Math.max(...accumulateVolume(bids), ...accumulateVolume(asks));
};