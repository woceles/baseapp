import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { ProfileAccountActivity } from '../../containers/ProfileAccountActivity';
import { ProfileApiKeys } from '../../containers/ProfileApiKeys';
import { ProfileAuthDetails } from '../../containers/ProfileAuthDetails';
import { ProfileVerification } from '../../containers/ProfileVerification';
import { ReferralProgram } from '../../containers/ReferralProgram';
import { setDocumentTitle } from '../../helpers';
class ProfileComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.goBack = () => {
            this.props.history.goBack();
        };
    }
    componentDidMount() {
        setDocumentTitle('Profile');
    }
    render() {
        return (React.createElement("div", { className: "container pg-profile-page" },
            React.createElement("div", { className: "pg-profile-page__details" },
                React.createElement("div", { className: "row pg-profile-page-header pg-profile-page-header-first" },
                    React.createElement("h3", { className: "col-12" },
                        React.createElement(FormattedMessage, { id: "page.body.profile.header.account" }))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-12 col-md-6 mx-0" },
                        React.createElement("div", { className: "row col-12 mx-0" },
                            React.createElement(ProfileAuthDetails, null))),
                    React.createElement("div", { className: "col-12 col-md-6" },
                        React.createElement(ProfileVerification, null))),
                React.createElement("div", { className: "row px-4" },
                    React.createElement("div", { className: "col-12 mx-0" },
                        React.createElement(ReferralProgram, null)))),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-12" },
                    React.createElement(ProfileApiKeys, null)),
                React.createElement("div", { className: "col-12" },
                    React.createElement(ProfileAccountActivity, null)))));
    }
}

const ProfileScreen = withRouter(ProfileComponent);
export { ProfileScreen, };