import { Button } from '@openware/components';
import * as React from 'react';
import { FormattedMessage, injectIntl, } from 'react-intl';
import { Modal } from '../../components';
class ModalWithdrawSubmitComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.translate = (e) => {
            return this.props.intl.formatMessage({ id: e });
        };
        this.renderHeaderModalSubmit = () => {
            return (React.createElement("div", { className: "pg-exchange-modal-submit-header" },
                React.createElement(FormattedMessage, { id: "page.modal.withdraw.success" })));
        };
        this.renderBodyModalSubmit = () => {
            return (React.createElement("div", { className: "pg-exchange-modal-submit-body modal-body__withdraw-submit" },
                React.createElement(FormattedMessage, { id: "page.modal.withdraw.success.message.content" })));
        };
        this.renderFooterModalSubmit = () => {
            return (React.createElement("div", { className: "pg-exchange-modal-submit-footer modal-footer__withdraw-submit" },
                React.createElement(Button, { className: "pg-exchange-modal-submit-footer__button-inverse", label: this.translate('page.modal.withdraw.success.button'), onClick: this.props.onSubmit })));
        };
    }
    render() {
        const { show } = this.props;
        return (React.createElement(Modal, { show: show, header: this.renderHeaderModalSubmit(), content: this.renderBodyModalSubmit(), footer: this.renderFooterModalSubmit() }));
    }
}
export const ModalWithdrawSubmit = injectIntl(ModalWithdrawSubmitComponent);