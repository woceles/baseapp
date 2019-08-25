import { Alert } from '@openware/components';
import * as React from 'react';
import FadeIn from 'react-fade-in';
import { injectIntl, } from 'react-intl';
import { connect } from 'react-redux';
import { alertDelete, alertDeleteByIndex, selectAlertState, } from '../../modules';
class AlertComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.deleteAlertByIndex = (key) => {
            this.props.alertDeleteByIndex(key);
        };
        this.translate = (id) => {
            return id ? this.props.intl.formatMessage({ id }) : '';
        };
    }
    
    render() {
        return (React.createElement("div", { className: "pg-alerts" }, this.props.alerts.alerts.map(w => w.message.map((msg, index) => React.createElement(FadeIn, { key: index },
            React.createElement("div", { onClick: () => this.deleteAlertByIndex(index) },
                React.createElement(Alert, { description: w.code && w.code.toString(10), title: this.translate(msg), type: w.type })))))));
    }
}
const mapStateToProps = (state) => ({
    alerts: selectAlertState(state),
});
const mapDispatchToProps = dispatch => ({
    alertDelete: () => dispatch(alertDelete()),
    alertDeleteByIndex: payload => dispatch(alertDeleteByIndex(payload)),
});
export const Alerts = injectIntl(connect(mapStateToProps, mapDispatchToProps)(AlertComponent));