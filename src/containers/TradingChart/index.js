import * as React from 'react';
import { connect } from 'react-redux';
import { widget, } from '../../charting_library/charting_library.min';
import { selectCurrentLanguage, selectCurrentMarket, selectKline, selectMarkets, selectMarketTickers, } from '../../modules';
import { rangerSubscribeKlineMarket, rangerUnsubscribeKlineMarket } from '../../modules/public/ranger';
import { dataFeedObject, print } from './api';
export class TradingChartComponent extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.currentKlineSubscription = {};
        this.params = {
            interval: '15',
            containerId: 'tv_chart_container',
            libraryPath: '/charting_library/',
            chartsStorageUrl: 'https://saveload.tradingview.com',
            chartsStorageApiVersion: '1.1',
            clientId: 'tradingview.com',
            userId: 'public_user_id',
            fullscreen: false,
            autosize: true,
            studiesOverrides: {},
        };
        this.tvWidget = null;
        this.datafeed = dataFeedObject(this, this.props.markets);
        this.setChart = (markets, currentMarket) => {
            this.datafeed = dataFeedObject(this, markets);
            const widgetOptions = {
                debug: false,
                symbol: currentMarket.id,
                toolbar_bg: '#1E2841',
                datafeed: this.datafeed,
                interval: this.params.interval,
                container_id: this.params.containerId,
                library_path: this.params.libraryPath,
                locale: this.props.lang,
                disabled_features: ['use_localstorage_for_settings', 'header_symbol_search'],
                enabled_features: ['show_animated_logo'],
                charts_storage_url: this.params.chartsStorageUrl,
                charts_storage_api_version: this.params.chartsStorageApiVersion,
                client_id: this.params.clientId,
                user_id: this.params.userId,
                fullscreen: this.params.fullscreen,
                autosize: this.params.autosize,
                studies_overrides: this.params.studiesOverrides,
                overrides: {
                    ['symbolWatermarkProperties.color']: '#1E2841',
                    ['volumePaneSize']: 'iny',
                    ['mainSeriesProperties.candleStyle.upColor']: '#54B489',
                    ['mainSeriesProperties.candleStyle.downColor']: '#E85E59',
                    ['mainSeriesProperties.candleStyle.borderUpColor']: '#54B489',
                    ['mainSeriesProperties.candleStyle.borderDownColor']: '#E85E59',
                    ['mainSeriesProperties.candleStyle.wickUpColor']: '#54B489',
                    ['mainSeriesProperties.candleStyle.wickDownColor']: '#E85E59',
                    ['paneProperties.background']: '#1E2841',
                    ['paneProperties.vertGridProperties.color']: '#1E2841',
                    ['paneProperties.vertGridProperties.style']: 1,
                    ['paneProperties.horzGridProperties.color']: '#1E2841',
                    ['paneProperties.horzGridProperties.style']: 1,
                    ['paneProperties.crossHairProperties.color']: '#1E2841',
                    ['paneProperties.crossHairProperties.width']: 1,
                    ['paneProperties.crossHairProperties.style']: 1,
                    ['scalesProperties.backgroundColor']: '#1E2841',
                },
                loading_screen: {
                    backgroundColor: '#1E2841',
                },
                popup_width: '000',
                // hide_top_toolbar: true,
                enable_publishing: false,
                withdateranges: false,
                hide_side_toolbar: false,
                theme: 'Dark',
                custom_css_url: '/css/tradingview.css',
                allow_symbol_change: false,
                details: true,
                hotlist: true,
                calendar: true,
                show_popup_button: true,
                popup_height: '50',
                height: 610,
            };
            this.tvWidget = new widget(widgetOptions);
            this.tvWidget.onChartReady(() => {
                this.tvWidget.activeChart().setSymbol(currentMarket.id, () => {
                    print('Symbol set', currentMarket.id);
                });
            });
        };
        this.updateChart = (currentMarket) => {
            if (this.tvWidget) {
                this.tvWidget.onChartReady(() => {
                    this.tvWidget.activeChart().setSymbol(currentMarket.id, () => {
                        print('Symbol set', currentMarket.id);
                    });
                });
            }
        };
    }
    componentWillReceiveProps(next) {
        if (next.currentMarket && (!this.props.currentMarket || next.currentMarket.id !== this.props.currentMarket.id)) {
            if (this.props.currentMarket && (this.props.currentMarket.id && this.tvWidget)) {
                this.updateChart(next.currentMarket);
            }
            else {
                this.setChart(next.markets, next.currentMarket);
            }
        }
        if (next.kline && next.kline !== this.props.kline) {
            this.datafeed.onRealtimeCallback(next.kline);
        }
    }
    componentDidMount() {
        if (this.props.currentMarket) {
            this.setChart(this.props.markets, this.props.currentMarket);
        }
    }
    componentWillUnmount() {
        if (this.tvWidget) {
            try {
                this.tvWidget.remove();
            }
            catch (error) {
                
                console.log(`TradingChart unmount failed: ${error}`);
            }
        }
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "cr-table-header__content" }, this.props.currentMarket ? this.props.currentMarket.name : ''),
            React.createElement("div", { id: this.params.containerId, className: "pg-trading-chart" })));
    }
}
const reduxProps = state => ({
    markets: selectMarkets(state),
    currentMarket: selectCurrentMarket(state),
    tickers: selectMarketTickers(state),
    kline: selectKline(state),
    lang: selectCurrentLanguage(state),
});
const mapDispatchProps = dispatch => ({
    subscribeKline: (marketId, periodString) => dispatch(rangerSubscribeKlineMarket(marketId, periodString)),
    unSubscribeKline: (marketId, periodString) => dispatch(rangerUnsubscribeKlineMarket(marketId, periodString)),
});
export const TradingChart = connect(reduxProps, mapDispatchProps)(TradingChartComponent);