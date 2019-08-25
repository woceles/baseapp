import * as React from 'react';
import { Modal, TabPanel } from '../../components';
const panels = [
    {
        label: 'LEGAL NOTES',
        content: (React.createElement("div", { className: 'tabs-content' }, "LEGAL NOTES")),
    },
    {
        label: 'PRIVACY POLICY',
        content: (React.createElement("div", { id: "privacy-policy", className: "tabs-content" }, "PRIVACY POLICY")),
    },
    {
        label: 'TERM OF SERVICE',
        content: (React.createElement("div", { className: 'tabs-content' }, "TERM OF SERVICE")),
    },
];
class LegalDocuments extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            currentTabIndex: 0,
        };
        this.onCurrentTabChange = index => this.setState({ currentTabIndex: index });
        this.renderModalBody = () => {
            return (React.createElement("div", null,
                React.createElement(TabPanel, { panels: panels, currentTabIndex: this.state.currentTabIndex, onCurrentTabChange: this.onCurrentTabChange })));
        };
    }
    render() {
        return (React.createElement(Modal, { className: 'pg-legal-docs-modal', show: this.props.isOpen, header: React.createElement("h3", null, "Title"), content: this.renderModalBody(), footer: this.props.footer }));
    }
}
export { LegalDocuments, };