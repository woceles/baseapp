import { Decimal, Pagination, } from '@openware/components';
import * as moment from 'moment';
import * as React from 'react';
import { injectIntl, } from 'react-intl';
import { connect } from 'react-redux';
import { History } from '../../components';
import { localeDate } from '../../helpers';
import { fetchHistory, resetHistory, selectCurrentPage, selectFirstElemIndex, selectFullHistory, selectHistory, selectHistoryLoading, selectLastElemIndex, selectNextPageExists, selectPageCount, selectWallets, } from '../../modules';
import { FailIcon } from './FailIcon';
import { SucceedIcon } from './SucceedIcon';
export class WalletTable extends React.Component {
    constructor() {
        super(...arguments);
        this.getHeaders = (label) => [
            this.props.intl.formatMessage({ id: `page.body.history.${label}.header.date` }),
            this.props.intl.formatMessage({ id: `page.body.history.${label}.header.status` }),
            this.props.intl.formatMessage({ id: `page.body.history.${label}.header.amount` }),
        ];
        this.onClickPrevPage = () => {
            const { page, type, currency } = this.props;
            this.props.fetchHistory({ page: Number(page) - 1, currency, type, limit: 6 });
        };
        this.onClickNextPage = () => {
            const { page, type, currency } = this.props;
            this.props.fetchHistory({ page: Number(page) + 1, currency, type, limit: 6 });
        };
        this.retrieveData = (list) => {
            const { fixed } = this.props.wallets.find(w => w.currency === this.props.currency) || { fixed: 8 };
            if (list.length === 0) {
                return [[this.props.intl.formatMessage({ id: 'page.noDataToShow' }), '', '']];
            }
            return list.sort((a, b) => {
                return moment(localeDate(a.created_at), 'DD/MM HH:mm') > moment(localeDate(b.created_at), 'DD/MM HH:mm') ? -1 : 1;
            }).map((item, index) => {
                const amount = 'amount' in item ? Number(item.amount) : Number(item.price) * Number(item.volume);
                const state = 'state' in item ? this.formatTxState(item.state) : '';
                return [
                    moment(item.created_at).format('DD-MM YYYY'),
                    state,
                    React.createElement(Decimal, { key: index, fixed: fixed }, amount),
                ];
            });
        };
        this.formatTxState = (tx) => {
            const statusMapping = {
                succeed: React.createElement(SucceedIcon, null),
                failed: React.createElement(FailIcon, null),
                accepted: React.createElement(SucceedIcon, null),
                collected: React.createElement(SucceedIcon, null),
                canceled: React.createElement(FailIcon, null),
                rejected: React.createElement(FailIcon, null),
                processing: this.props.intl.formatMessage({ id: 'page.body.wallets.table.pending' }),
                prepared: this.props.intl.formatMessage({ id: 'page.body.wallets.table.pending' }),
                submitted: this.props.intl.formatMessage({ id: 'page.body.wallets.table.pending' }),
                skipped: React.createElement(SucceedIcon, null),
            };
            return statusMapping[tx];
        };
    }
    componentDidMount() {
        const { type, currency } = this.props;
        this.props.fetchHistory({ page: 0, currency, type, limit: 6 });
    }
    componentWillReceiveProps(nextProps) {
        const { type, currency } = this.props;
        if (nextProps.currency !== currency || nextProps.type !== type) {
            this.props.resetHistory();
            this.props.fetchHistory({ page: 0, currency: nextProps.currency, type, limit: 6 });
        }
    }
    componentWillUnmount() {
        this.props.resetHistory();
    }
    render() {
        const { label, list, fullHistory, firstElemIndex, lastElemIndex, page, nextPageExists } = this.props;
        if (!list.length) {
            return null;
        }
        return (React.createElement("div", { className: "pg-history-elem__wallet" },
            React.createElement("div", { className: "pg-history-elem__label" }, this.props.intl.formatMessage({ id: `page.body.history.${label}` })),
            React.createElement(History, { headers: this.getHeaders(label), data: this.retrieveData(list) }),
            React.createElement(Pagination, { firstElemIndex: firstElemIndex, lastElemIndex: lastElemIndex, total: fullHistory, page: page, nextPageExists: nextPageExists, onClickPrevPage: this.onClickPrevPage, onClickNextPage: this.onClickNextPage })));
    }
}
export const mapStateToProps = (state) => ({
    list: selectHistory(state),
    wallets: selectWallets(state),
    fetching: selectHistoryLoading(state),
    fullHistory: selectFullHistory(state),
    page: selectCurrentPage(state),
    pageCount: selectPageCount(state, 6),
    firstElemIndex: selectFirstElemIndex(state, 6),
    lastElemIndex: selectLastElemIndex(state, 6),
    nextPageExists: selectNextPageExists(state, 6),
});
export const mapDispatchToProps = dispatch => ({
    fetchHistory: params => dispatch(fetchHistory(params)),
    resetHistory: () => dispatch(resetHistory()),
});
export const WalletHistory = injectIntl(connect(mapStateToProps, mapDispatchToProps)(WalletTable));