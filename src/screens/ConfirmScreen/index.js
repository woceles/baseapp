import classnames from 'classnames';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Documents } from '../../containers/Confirm/Documents';
import { Identity } from '../../containers/Confirm/Identity';
import { Phone } from '../../containers/Confirm/Phone';
import { setDocumentTitle } from '../../helpers';
import { labelFetch, selectLabelData, selectUserInfo } from '../../modules';
class ConfirmComponent extends React.Component {
    constructor(props) {
        super(props);
        this.goBack = event => {
            event.preventDefault();
            this.props.history.goBack();
        };
        this.renderContent = (level) => {
            const { labels } = this.props;
            const isIdentity = labels.find(w => w.key === 'profile' && w.value === 'verified');
            switch (level) {
                case 1: return React.createElement(Phone, null);
                case 2: return isIdentity ? React.createElement(Documents, null) : React.createElement(Identity, null);
                case 3: return React.createElement(Documents, null);
                default: return 'Something went wrong';
            }
        };
        this.state = {
            title: '',
            level: 1,
        };
    }
    componentDidMount() {
        setDocumentTitle('Confirm');
        this.props.labelFetch();
        const { userData } = this.props;
        this.setState({
            level: userData.level,
        });
    }
    render() {
        const { userData, labels } = this.props;
        const isIdentity = labels.find(w => w.key === 'profile' && w.value === 'verified');
        const currentProfileLevel = userData.level;
        const cx = classnames('pg-confirm__progress-items', {
            'pg-confirm__progress-first': currentProfileLevel === 1,
            'pg-confirm__progress-second': currentProfileLevel === 2 && !isIdentity,
            'pg-confirm__progress-third': currentProfileLevel === 3 || isIdentity,
        });
        return (React.createElement("div", { className: "pg-wrapper" },
            React.createElement("div", { className: "pg-confirm" },
                React.createElement("div", { className: "pg-confirm-box" },
                    React.createElement("a", { href: "#", onClick: this.goBack, className: "pg-confirm-box-close" }),
                    React.createElement("div", { className: "pg-confirm__progress" },
                        React.createElement("div", { className: cx },
                            React.createElement("div", { className: "pg-confirm__progress-circle-1" },
                                React.createElement("span", { className: "pg-confirm__title-text pg-confirm__active-1" },
                                    React.createElement(FormattedMessage, { id: "page.body.kyc.head.phone" }))),
                            React.createElement("div", { className: "pg-confirm__progress-line-1" }),
                            React.createElement("div", { className: "pg-confirm__progress-circle-2" },
                                React.createElement("span", { className: "pg-confirm__title-text pg-confirm__active-2" },
                                    React.createElement(FormattedMessage, { id: "page.body.kyc.head.identity" }))),
                            React.createElement("div", { className: "pg-confirm__progress-line-2" }),
                            React.createElement("div", { className: "pg-confirm__progress-circle-3" },
                                React.createElement("span", { className: "pg-confirm__title-text pg-confirm__active-3" },
                                    React.createElement(FormattedMessage, { id: "page.body.kyc.head.document" }))))),
                    React.createElement("div", { className: "pg-confirm__content" }, this.renderContent(currentProfileLevel))))));
    }
}
const mapStateToProps = (state) => ({
    userData: selectUserInfo(state),
    labels: selectLabelData(state),
});
const mapDispatchToProps = dispatch => ({
    labelFetch: () => dispatch(labelFetch()),
});

export const ConfirmScreen = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmComponent));