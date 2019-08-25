
import { Checkbox } from '@openware/components';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
class ProfileTwoFactorAuthComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggle2fa = () => {
            this.props.navigateTo2fa(!this.state.is2faEnabled);
        };
        this.state = {
            is2faEnabled: props.is2faEnabled,
        };
    }
    render() {
        const { is2faEnabled } = this.state;
        const className = is2faEnabled ? 'pg-profile-page__label-value__enabled'
            : 'pg-profile-page__label-value__disabled';
        return (React.createElement(React.Fragment, null,
            React.createElement("label", { className: "pg-profile-page__label" },
                React.createElement("div", null,
                    React.createElement(FormattedMessage, { id: "page.body.profile.header.account.content.twoFactorAuthentication" })),
                React.createElement("span", { className: className }, is2faEnabled ? React.createElement(FormattedMessage, { id: "page.body.profile.header.account.content.twoFactorAuthentication.message.enable" })
                    : React.createElement(FormattedMessage, { id: "page.body.profile.header.account.content.twoFactorAuthentication.message.disable" }))),
            React.createElement(Checkbox, { checked: is2faEnabled, className: 'pg-profile-page__switch', onChange: () => this.handleToggle2fa(), label: '', slider: true })));
    }
}
export const ProfileTwoFactorAuth = ProfileTwoFactorAuthComponent;