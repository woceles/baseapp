import { Decimal, Loader, Pagination } from '@openware/components';
import * as React from 'react';
import { injectIntl, } from 'react-intl';
import { connect } from 'react-redux';
import { History } from '../../components';
import { localeDate, preciseData, setDepositStatusColor, setTradesType, setWithdrawStatusColor, uppercase, } from '../../helpers';
import { fetchHistory, selectCurrentPage, selectFirstElemIndex, selectFullHistory, selectHistory, selectHistoryLoading, selectLastElemIndex, selectMarkets, selectNextPageExists, selectPageCount, selectWallets, } from '../../modules';
class HistoryComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.renderContent = () => {
            const { type, firstElemIndex, lastElemIndex, fullHistory, page, nextPageExists } = this.props;
            return (React.createElement(React.Fragment, null,
                React.createElement(History, { headers: this.renderHeaders(type), data: this.retrieveData() }),
                React.createElement(Pagination, { firstElemIndex: firstElemIndex, lastElemIndex: lastElemIndex, total: fullHistory, page: page, nextPageExists: nextPageExists, onClickPrevPage: this.onClickPrevPage, onClickNextPage: this.onClickNextPage })));
        };
        this.onClickPrevPage = () => {
            const { page, type } = this.props;
            this.props.fetchHistory({ page: Number(page) - 1, type, limit: 25 });
        };
        this.onClickNextPage = () => {
            const { page, type } = this.props;
            this.props.fetchHistory({ page: Number(page) + 1, type, limit: 25 });
        };
        this.renderHeaders = (type) => {
            switch (type) {
                case 'deposits':
                    return [
                        this.props.intl.formatMessage({ id: 'page.body.history.deposit.header.txid' }),
                        this.props.intl.formatMessage({ id: 'page.body.history.deposit.header.date' }),
                        this.props.intl.formatMessage({ id: 'page.body.history.deposit.header.currency' }),
                        this.props.intl.formatMessage({ id: 'page.body.history.deposit.header.amount' }),
                        this.props.intl.formatMessage({ id: 'page.body.history.deposit.header.status' }),
                    ];
                case 'withdraws':
                    return [
                        this.props.intl.formatMessage({ id: 'page.body.history.withdraw.header.address' }),
                        this.props.intl.formatMessage({ id: 'page.body.history.withdraw.header.date' }),
                        this.props.intl.formatMessage({ id: 'page.body.history.withdraw.header.currency' }),
                        this.props.intl.formatMessage({ id: 'page.body.history.withdraw.header.amount' }),
                        this.props.intl.formatMessage({ id: 'page.body.history.withdraw.header.fee' }),
                        this.props.intl.formatMessage({ id: 'page.body.history.withdraw.header.status' }),
                    ];
                case 'trades':
                    return [
                        this.props.intl.formatMessage({ id: 'page.body.history.trade.header.date' }),
                        this.props.intl.formatMessage({ id: 'page.body.history.trade.header.side' }),
                        this.props.intl.formatMessage({ id: 'page.body.history.trade.header.market' }),
                        this.props.intl.formatMessage({ id: 'page.body.history.trade.header.price' }),
                        this.props.intl.formatMessage({ id: 'page.body.history.trade.header.amount' }),
                        this.props.intl.formatMessage({ id: 'page.body.history.trade.header.funds' }),
                    ];
                default:
                    return [];
            }
        };
        this.retrieveData = () => {
            const { type, list } = this.props;
            return [...list]
                .map(item => this.renderTableRow(type, item));
        };
        this.renderTableRow = (type, item) => {
            const { marketsData, wallets } = this.props;
            switch (type) {
                case 'deposits': {
                    const { txid, created_at, currency, amount } = item;
                    const state = this.props.intl.formatMessage({ id: `page.body.history.deposit.content.status.${item.state}` });
                    const blockchainLink = this.getBlockchainLink(currency, txid);
                    const wallet = wallets.find(obj => obj.currency === currency);
                    return [
                        React.createElement("div", { className: "pg-history-elem__hide", key: txid },
                            React.createElement("a", { href: blockchainLink, target: "_blank", rel: "noopener noreferrer" }, txid)),
                        localeDate(created_at),
                        currency && currency.toUpperCase(),
                        wallet && preciseData(amount, wallet.fixed),
                        React.createElement("span", { style: { color: setDepositStatusColor(item.state) }, key: txid }, state),
                    ];
                }
                case 'withdraws': {
                    const { txid, created_at, currency, amount, fee, rid } = item;
                    const state = this.props.intl.formatMessage({ id: `page.body.history.withdraw.content.status.${item.state}` });
                    const blockchainLink = this.getBlockchainLink(currency, txid, rid);
                    const wallet = wallets.find(obj => obj.currency === currency);
                    return [
                        React.createElement("div", { className: "pg-history-elem__hide", key: txid || rid },
                            React.createElement("a", { href: blockchainLink, target: "_blank", rel: "noopener noreferrer" }, txid || rid)),
                        localeDate(created_at),
                        uppercase(currency),
                        wallet && preciseData(amount, wallet.fixed),
                        fee,
                        React.createElement("span", { style: { color: setWithdrawStatusColor(item.state) }, key: txid || rid }, state),
                    ];
                }
                case 'trades': {
                    const { id, created_at, side, market, price, funds, volume } = item;
                    const marketToDisplay = marketsData.find(m => m.id === market) ||
                        { name: '', bid_precision: 0, ask_precision: 0 };
                    const marketName = marketToDisplay ? marketToDisplay.name : market;
                    const sideText = setTradesType(side).text.toLowerCase() ? this.props.intl.formatMessage({ id: `page.body.history.trade.content.side.${setTradesType(side).text.toLowerCase()}` }) : '';
                    return [
                        localeDate(created_at),
                        React.createElement("span", { style: { color: setTradesType(side).color }, key: id }, sideText),
                        marketName,
                        React.createElement(Decimal, { key: id, fixed: marketToDisplay.bid_precision }, price),
                        React.createElement(Decimal, { key: id, fixed: marketToDisplay.ask_precision }, volume),
                        React.createElement(Decimal, { key: id, fixed: marketToDisplay.bid_precision }, funds),
                    ];
                }
                default: {
                    return [];
                }
            }
        };
        this.getBlockchainLink = (currency, txid, rid) => {
            const currencyInfo = this.props.wallets.find(wallet => wallet.currency === currency);
            if (currencyInfo) {
                if (txid) {
                    return currencyInfo.explorerTransaction.replace('#{txid}', txid);
                }
                if (rid) {
                    return currencyInfo.explorerAddress.replace('#{address}', rid);
                }
            }
            return '';
        };
    }
    componentDidMount() {
        const { type } = this.props;
        this.props.fetchHistory({ page: 0, type, limit: 25 });
    }
    render() {
        const { list, fetching } = this.props;
        return (React.createElement("div", { className: `pg-history-elem ${list.length ? '' : 'pg-history-elem-empty'}` },
            fetching && React.createElement(Loader, null),
            list.length ? this.renderContent() : null,
            !list.length && !fetching ? React.createElement("p", { className: "pg-history-elem__empty" }, this.props.intl.formatMessage({ id: 'page.noDataToShow' })) : null));
    }
}
const mapStateToProps = (state) => ({
    marketsData: selectMarkets(state),
    wallets: selectWallets(state),
    list: selectHistory(state),
    fetching: selectHistoryLoading(state),
    fullHistory: selectFullHistory(state),
    page: selectCurrentPage(state),
    pageCount: selectPageCount(state, 25),
    firstElemIndex: selectFirstElemIndex(state, 25),
    lastElemIndex: selectLastElemIndex(state, 25),
    nextPageExists: selectNextPageExists(state, 25),
});
export const mapDispatchToProps = dispatch => ({
    fetchHistory: params => dispatch(fetchHistory(params)),
});
const HistoryElement = injectIntl(connect(mapStateToProps, mapDispatchToProps)(HistoryComponent));
export { HistoryElement, };