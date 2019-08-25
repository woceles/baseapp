import cn from 'classnames';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { labelFetch, selectLabelData, selectUserInfo } from '../../modules';
class ProfileVerificationComponent extends React.Component {
    componentDidMount() {
        this.props.labelFetch();
    }
    render() {
        const { user } = this.props;
        const userLevel = user.level;
        return (React.createElement("div", { className: "pg-profile-page__box pg-profile-page__left-col__verification" },
            React.createElement("div", { className: "pg-profile-page__box-header" },
                React.createElement("div", { className: "pg-profile-page__row" },
                    React.createElement("div", { className: "pg-profile-page__verification-header" },
                        React.createElement(FormattedMessage, { id: "page.body.profile.header.account.profile" })))),
            this.renderFirstLevel(userLevel),
            this.renderSecondLevel(userLevel),
            this.renderThirdLevel(userLevel)));
    }
    renderFirstLevel(userLevel) {
        const targetLevel = 1;
        const { titleClassName, } = this.getLevelsClassNames(userLevel, targetLevel);
        return (React.createElement("div", { className: "pg-profile-page__row pg-profile-page__level-verification" },
            React.createElement("div", { className: titleClassName },
                this.renderVerificationLevel('page.body.profile.header.account.profile.email', userLevel, targetLevel),
                React.createElement("p", null,
                    React.createElement(FormattedMessage, { id: "page.body.profile.header.account.profile.email.message" })))));
    }
    renderSecondLevel(userLevel) {
        const targetLevel = 2;
        const { titleClassName, } = this.getLevelsClassNames(userLevel, targetLevel);
        return (React.createElement("div", { className: "pg-profile-page__row pg-profile-page__level-verification" },
            React.createElement("div", { className: titleClassName },
                this.renderVerificationLevel('page.body.profile.header.account.profile.phone', userLevel, targetLevel),
                React.createElement("p", null,
                    React.createElement(FormattedMessage, { id: "page.body.profile.header.account.profile.phone.message" })))));
    }
    renderThirdLevel(userLevel) {
        const targetLevel = 3;
        const documentLabel = this.props.label.find((label) => label.key === 'document');
        const isPending = documentLabel && documentLabel.value === 'pending' ? this.renderPendingIcon() : '';
        const { titleClassName, } = this.getLevelsClassNames(userLevel, targetLevel);
        return (React.createElement("div", { className: "pg-profile-page__row pg-profile-page__level-verification" },
            React.createElement("div", { className: titleClassName },
                this.renderIdentityVerification('page.body.profile.header.account.profile.identity', userLevel, targetLevel, documentLabel),
                React.createElement("p", null,
                    React.createElement(FormattedMessage, { id: "page.body.profile.header.account.profile.identity.message" }))),
            isPending));
    }
    renderPendingIcon() {
        return (React.createElement("div", { className: "pg-profile-page__level-verification__pending" },
            React.createElement("p", null,
                React.createElement(FormattedMessage, { id: "page.body.wallets.table.pending" })),
            React.createElement("img", { src: require('../../assets/images/pending.svg') })));
    }
    renderVerificationLevel(text, userLevel, targetLevel) {
        if (userLevel === (targetLevel - 1)) {
            return (React.createElement("a", { href: "/confirm", className: "pg-profile-page__level-verification__url" },
                React.createElement(FormattedMessage, { id: `${text}.unverified.title` })));
        }
        else {
            if (userLevel < targetLevel) {
                return (React.createElement("p", { className: "pg-profile-page__level-verification__name" },
                    React.createElement(FormattedMessage, { id: `${text}.unverified.title` })));
            }
            else {
                return (React.createElement("p", { className: "pg-profile-page__level-verification__name" },
                    React.createElement(FormattedMessage, { id: `${text}.title` })));
            }
        }
    }
    renderIdentityVerification(text, userLevel, targetLevel, documentLabel) {
        const isLabelExist = this.props.label;
        if (isLabelExist.length > 0) {
            switch (userLevel) {
                case targetLevel - 1: {
                    if (documentLabel) {
                        return (React.createElement("p", { className: "pg-profile-page__level-verification__name" },
                            React.createElement(FormattedMessage, { id: `${text}.unverified.title` })));
                    }
                    else {
                        return (React.createElement("a", { href: "/confirm", className: "pg-profile-page__level-verification__url" },
                            React.createElement(FormattedMessage, { id: `${text}.unverified.title` })));
                    }
                }
                case targetLevel: return (React.createElement("p", { className: "pg-profile-page__level-verification__name" },
                    React.createElement(FormattedMessage, { id: `${text}.title` })));
                default: return (React.createElement("p", { className: "pg-profile-page__level-verification__name" },
                    React.createElement(FormattedMessage, { id: `${text}.unverified.title` })));
            }
        }
        else {
            return (React.createElement("p", { className: "pg-profile-page__level-verification__name" },
                React.createElement(FormattedMessage, { id: `${text}.unverified.title` })));
        }
    }
    getLevelsClassNames(currentLevel, targetLevel) {
        const levelSatisfied = currentLevel >= targetLevel;
        const levelClassName = cn({
            'pg-profile-page__text-purple': levelSatisfied,
        });
        const titleClassName = cn('pg-profile-page__ml-gap', {
            'pg-profile-page__text-success': levelSatisfied,
        });
        return { levelClassName, titleClassName };
    }
}
const mapStateToProps = state => ({
    user: selectUserInfo(state),
    label: selectLabelData(state),
});
const mapDispatchProps = dispatch => ({
    labelFetch: () => dispatch(labelFetch()),
});
const ProfileVerification = connect(mapStateToProps, mapDispatchProps)(ProfileVerificationComponent);
export { ProfileVerification, };