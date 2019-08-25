import { Button } from '@openware/components';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';
import { LegalDocuments } from '../LegalDocuments';
class FooterComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            showModal: false,
        };
        this.toggleModal = () => {
            this.setState({
                showModal: !this.state.showModal,
            });
        };
    }
    render() {
        const { showModal } = this.state;
        // eslint-disable-next-line no-restricted-globals
        if (location.pathname.startsWith('/confirm')) {
            return React.createElement(React.Fragment, null);
        }
        return (React.createElement(React.Fragment, null,
            React.createElement("footer", { className: "pg-footer" },
                React.createElement("span", { className: "pg-footer__link", onClick: this.toggleModal },
                    React.createElement(FormattedMessage, { id: "page.footer.legalDocuments" })),
                React.createElement(LegalDocuments, { isOpen: showModal, footer: React.createElement(Button, { label: 'Ok', onClick: this.toggleModal }) }),
                React.createElement(Link, { className: "pg-footer__link", to: "/help" },
                    React.createElement(FormattedMessage, { id: "page.footer.faq" })))));
    }
}

const Footer = withRouter(FooterComponent);
export { Footer, };