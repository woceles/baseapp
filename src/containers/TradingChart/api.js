import axios from 'axios';
import { tradeUrl } from '../../api/config';
import { klineArrayToObject } from '../../modules';
import { periodMinutesToString } from '../../modules/public/ranger/helpers';

export const print = (...x) => console.log.apply(null, ['>>>> TC', ...x]);
const makeHistoryUrl = (market, resolution, from, to) => `${tradeUrl()}/public/markets/${market}/k-line?period=${resolution}&time_from=${from}&time_to=${to}`;
const resolutionToSeconds = (r) => {
    const minutes = parseInt(r, 10);
    if (r === '1D') {
        return 1440;
    }
    else if (r === 'D') {
        return 4320;
    }
    else if (!isNaN(minutes)) {
        return minutes;
    }
    else {
        return 1;
    }
};
const config = {
    supports_time: false,
    supported_resolutions: ['1', '5', '15', '30', '60', '120', '240', '360', '720', 'd', '3d'],
};
export const dataFeedObject = (tradingChart, markets) => {
    const dataFeed = {
        onReady: cb => {
            setTimeout(() => cb(config), 0);
        },
        searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
            const symbols = markets.map(m => ({
                symbol: m.id,
                full_name: m.name,
                description: m.name,
                exchange: 'Exchange',
                ticker: m.id,
                type: 'bitcoin',
            }));
            setTimeout(() => onResultReadyCallback(symbols), 0);
        },
        resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
            // expects a symbolInfo object in response
            const symbol = markets.find(m => m.id === symbolName);
            if (!symbol) {
                return setTimeout(() => onResolveErrorCallback('Symbol not found'), 0);
            }
            const symbolStub = {
                name: symbol.name,
                description: '',
                type: 'bitcoin',
                session: '24x7',
                timezone: 'Etc/UTC',
                ticker: symbol.id,
                exchange: 'Exchange',
                minmov: 1,
                pricescale: 10000,
                has_intraday: true,
                intraday_multipliers: ['1', '5', '15', '30', '60', '120', '240', '360', '720', 'd', '3d'],
                supported_resolutions: ['1', '5', '15', '30', '60', '120', '240', '360', '720', 'd', '3d'],
                volume_precision: 8,
                data_status: 'streaming',
            };
            return setTimeout(() => onSymbolResolvedCallback(symbolStub), 0);
        },
        getBars: async (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) => {
            const url = makeHistoryUrl(symbolInfo.ticker || symbolInfo.name.toLowerCase(), resolutionToSeconds(resolution), from, to);
            return axios
                .get(url)
                .then(({ data }) => {
                if (data.length < 1) {
                    return onHistoryCallback([], { noData: true });
                }
                const bars = data.map(klineArrayToObject);
                return onHistoryCallback(bars, { noData: false });
            })
                .catch(e => {
                return onHistoryCallback([], { noData: true });
            });
        },
        subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
            dataFeed.onRealtimeCallback = (kline) => {
                if (kline.last &&
                    kline.marketId === tradingChart.currentKlineSubscription.marketId &&
                    kline.period === tradingChart.currentKlineSubscription.periodString) {
                    onRealtimeCallback(kline.last);
                }
            };
            const marketId = symbolInfo.ticker;
            const periodString = periodMinutesToString(resolutionToSeconds(resolution));
            tradingChart.props.subscribeKline(marketId, periodString);
            tradingChart.currentKlineSubscription = {
                marketId,
                periodString,
            };
        },
        unsubscribeBars: (subscribeUID) => {
            const { marketId, periodString } = tradingChart.currentKlineSubscription;
            if (marketId && periodString) {
                tradingChart.props.unSubscribeKline(marketId, periodString);
            }
            tradingChart.currentKlineSubscription = {};
        },
        onRealtimeCallback: (kline) => {
            // window.console.log(`default onRealtimeCallback called with ${JSON.stringify(bar)}`);
        },
    };
    return dataFeed;
};