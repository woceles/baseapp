import * as React from 'react';
import { injectIntl, } from 'react-intl';
import { connect, } from 'react-redux';
import { TabPanel } from '../../components';
import { HistoryElement } from '../../containers/HistoryElement';
import { setDocumentTitle } from '../../helpers';
import { fetchHistory, marketsFetch, resetHistory, walletsFetch, } from '../../modules';
class History extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            tab: 'deposits',
            currentTabIndex: 0,
        };
        this.tabMapping = ['deposits', 'withdraws', 'trades'];
        this.onCurrentTabChange = index => this.setState({ currentTabIndex: index });
        this.handleMakeRequest = (index) => {
            if (this.state.tab === this.tabMapping[index]) {
                return;
            }
            this.props.resetHistory();
            this.setState({ tab: this.tabMapping[index] });
        };
        this.renderTabs = () => {
            const { tab } = this.state;
            return [
                {
                    content: tab === 'deposits' ? React.createElement(HistoryElement, { type: "deposits" }) : null,
                    label: this.props.intl.formatMessage({ id: 'page.body.history.deposit' }),
                },
                {
                    content: tab === 'withdraws' ? React.createElement(HistoryElement, { type: "withdraws" }) : null,
                    label: this.props.intl.formatMessage({ id: 'page.body.history.withdraw' }),
                },
                {
                    content: tab === 'trades' ? React.createElement(HistoryElement, { type: "trades" }) : null,
                    label: this.props.intl.formatMessage({ id: 'page.body.history.trade' }),
                },
            ];
        };
    }
    componentDidMount() {
        setDocumentTitle('History');
        this.props.fetchMarkets();
        this.props.fetchWallets();
    }
    componentWillUnmount() {
        this.props.resetHistory();
    }
    render() {
        return (React.createElement("div", { className: "pg-history-tab pg-container" },
            React.createElement("div", { className: "pg-history-tab__tabs-content" },
                React.createElement(TabPanel, { panels: this.renderTabs(), onTabChange: this.handleMakeRequest, currentTabIndex: this.state.currentTabIndex, onCurrentTabChange: this.onCurrentTabChange }))));
    }
}
const mapDispatchToProps = dispatch => ({
    fetchMarkets: () => dispatch(marketsFetch()),
    fetchWallets: () => dispatch(walletsFetch()),
    fetchHistory: payload => dispatch(fetchHistory(payload)),
    resetHistory: () => dispatch(resetHistory()),
});
export const HistoryScreen = injectIntl(connect(null, mapDispatchToProps)(History));