import { Button, Dropdown, } from '@openware/components';
import cr from 'classnames';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import MaskInput from 'react-maskinput';
import { connect, } from 'react-redux';
import { countries } from 'countries-list';
import { isDateInFuture } from '../../../helpers';
import { selectCurrentLanguage } from '../../../modules';
import { selectSendIdentitySuccess, sendIdentity, } from '../../../modules/user/kyc/identity';
import { labelFetch } from '../../../modules/user/kyc/label';
import { nationalities } from '../../../translations/nationalities';
class IdentityComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            city: '',
            countryOfBirth: '',
            dateOfBirth: '',
            firstName: '',
            lastName: '',
            nationality: '',
            postcode: '',
            residentialAddress: '',
            cityFocused: false,
            dateOfBirthFocused: false,
            firstNameFocused: false,
            lastNameFocused: false,
            postcodeFocused: false,
            residentialAddressFocused: false,
        };
        this.translate = (e) => {
            return this.props.intl.formatMessage({ id: e });
        };
        this.scrollToElement = (displayedElem) => {
            const element = document.getElementsByClassName('pg-confirm__content-identity-col-row')[displayedElem];
            element && element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        };
        this.handleFieldFocus = (field) => {
            return () => {
                switch (field) {
                    case 'city':
                        this.setState({
                            cityFocused: !this.state.cityFocused,
                        });
                        this.scrollToElement(6);
                        break;
                    case 'dateOfBirth':
                        this.setState({
                            dateOfBirthFocused: !this.state.dateOfBirthFocused,
                        });
                        this.scrollToElement(2);
                        break;
                    case 'firstName':
                        this.setState({
                            firstNameFocused: !this.state.firstNameFocused,
                        });
                        this.scrollToElement(0);
                        break;
                    case 'lastName':
                        this.setState({
                            lastNameFocused: !this.state.lastNameFocused,
                        });
                        this.scrollToElement(1);
                        break;
                    case 'postcode':
                        this.setState({
                            postcodeFocused: !this.state.postcodeFocused,
                        });
                        this.scrollToElement(7);
                        break;
                    case 'residentialAddress':
                        this.setState({
                            residentialAddressFocused: !this.state.residentialAddressFocused,
                        });
                        this.scrollToElement(4);
                        break;
                    default:
                        break;
                }
            };
        };
        this.handleChange = (key) => {
            return (e) => {

                this.setState({
                    [key]: e.target.value,
                });
            };
        };
        this.handleConfirmEnterPress = (event) => {
            if (event.key === 'Enter' && !this.handleCheckButtonDisabled()) {
                event.preventDefault();
                this.sendData();
            }
        };
        this.formatDate = (date) => {
            const [day, month, year] = date.split('/');
            let formatDay = day ? day : '';
            formatDay = formatDay === '' || parseFloat(formatDay) <= 31 ? formatDay : '31';
            let formatMonth = month ? month : '';
            formatMonth = formatMonth === '' || parseFloat(formatMonth) <= 12 ? formatMonth : '12';
            const formatYear = year ? parseFloat(year) : '';
            return (formatDay && formatMonth && formatYear) ?
                `${formatDay}/${formatMonth}/${formatYear}` : date;
        };
        this.handleChangeDate = (e) => {
            this.setState({
                dateOfBirth: this.formatDate(e.target.value),
            });
        };
        this.selectNationality = (value) => {
            this.setState({
                nationality: value,
            });
        };
        this.selectCountry = (value) => {
            this.setState({
                countryOfBirth: countries.getAlpha2Code(value, this.props.lang),
            });
        };
        this.handleCheckButtonDisabled = () => {
            const { city, dateOfBirth, firstName, lastName, postcode, residentialAddress, countryOfBirth, nationality, } = this.state;
            return !firstName || !lastName || !dateOfBirth || !nationality || !residentialAddress || !countryOfBirth || !city || !postcode;
        };
        this.sendData = () => {
            const dob = !isDateInFuture(this.state.dateOfBirth) ? this.state.dateOfBirth : '';
            const profileInfo = {
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                dob,
                address: this.state.residentialAddress,
                postcode: this.state.postcode,
                city: this.state.city,
                country: this.state.countryOfBirth,
            };
            this.props.sendIdentity(profileInfo);
        };
    }
    componentDidUpdate(prev) {
        if (!prev.success && this.props.success) {
            this.props.labelFetch();
        }
    }
    render() {
        const { city, dateOfBirth, firstName, lastName, postcode, residentialAddress, cityFocused, dateOfBirthFocused, firstNameFocused, lastNameFocused, postcodeFocused, residentialAddressFocused, countryOfBirth, nationality, } = this.state;
        const { success, lang } = this.props;
        const cityGroupClass = cr('pg-confirm__content-identity-col-row-content', {
            'pg-confirm__content-identity-col-row-content--focused': cityFocused,
        });
        const dateOfBirthGroupClass = cr('pg-confirm__content-identity-col-row-content', {
            'pg-confirm__content-identity-col-row-content--focused': dateOfBirthFocused,
        });
        const firstNameGroupClass = cr('pg-confirm__content-identity-col-row-content', {
            'pg-confirm__content-identity-col-row-content--focused': firstNameFocused,
        });
        const lastNameGroupClass = cr('pg-confirm__content-identity-col-row-content', {
            'pg-confirm__content-identity-col-row-content--focused': lastNameFocused,
        });
        const postcodeGroupClass = cr('pg-confirm__content-identity-col-row-content', {
            'pg-confirm__content-identity-col-row-content--focused': postcodeFocused,
        });
        const residentialAddressGroupClass = cr('pg-confirm__content-identity-col-row-content', {
            'pg-confirm__content-identity-col-row-content--focused': residentialAddressFocused,
        });
        const dataNationalities = nationalities.map(value => {
            return this.translate(value);
        });
        const onSelectNationality = value => this.selectNationality(dataNationalities[value]);

        countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
        countries.registerLocale(require("i18n-iso-countries/langs/ru.json"));
        countries.registerLocale(require("i18n-iso-countries/langs/zh.json"));

        const dataCountries = Object.values(countries.getNames(lang));
        const onSelectCountry = value => this.selectCountry(dataCountries[value]);
        return (React.createElement("div", { className: "pg-confirm__content-identity" },
            React.createElement("div", { className: "pg-confirm__content-identity-forms" },
                React.createElement("div", { className: "pg-confirm__content-identity-col" },
                    React.createElement("div", { className: "pg-confirm__content-identity-col-row" },
                        React.createElement("fieldset", { className: firstNameGroupClass },
                            firstName && React.createElement("legend", null, this.translate('page.body.kyc.identity.firstName')),
                            React.createElement("input", { className: "pg-confirm__content-identity-col-row-content-number", type: "string", placeholder: this.translate('page.body.kyc.identity.firstName'), value: firstName, onChange: this.handleChange('firstName'), onFocus: this.handleFieldFocus('firstName'), onBlur: this.handleFieldFocus('firstName'), autoFocus: true }))),
                    React.createElement("div", { className: "pg-confirm__content-identity-col-row" },
                        React.createElement("fieldset", { className: lastNameGroupClass },
                            lastName && React.createElement("legend", null, this.translate('page.body.kyc.identity.lastName')),
                            React.createElement("input", { className: "pg-confirm__content-identity-col-row-content-number", type: "string", placeholder: this.translate('page.body.kyc.identity.lastName'), value: lastName, onChange: this.handleChange('lastName'), onFocus: this.handleFieldFocus('lastName'), onBlur: this.handleFieldFocus('lastName') }))),
                    React.createElement("div", { className: "pg-confirm__content-identity-col-row" },
                        React.createElement("fieldset", { className: dateOfBirthGroupClass },
                            dateOfBirth && React.createElement("legend", null, this.translate('page.body.kyc.identity.dateOfBirth')),
                            React.createElement(MaskInput, { className: "pg-confirm__content-identity-col-row-content-number", maskString: "00/00/0000", mask: "00/00/0000", onChange: this.handleChangeDate, onFocus: this.handleFieldFocus('dateOfBirth'), onBlur: this.handleFieldFocus('dateOfBirth'), value: dateOfBirth, placeholder: this.translate('page.body.kyc.identity.dateOfBirth') }))),
                    React.createElement("div", { className: "pg-confirm__content-identity-col-row" },
                        React.createElement("div", { className: "pg-confirm__content-identity-col-row-content" },
                            React.createElement("div", { className: "pg-confirm__content-identity-col-row-content-label" }, nationality && this.translate('page.body.kyc.identity.nationality')),
                            React.createElement(Dropdown, { className: "pg-confirm__content-documents-col-row-content-number", list: dataNationalities, onSelect: onSelectNationality, placeholder: this.translate('page.body.kyc.identity.nationality') })))),
                React.createElement("div", { className: "pg-confirm__content-identity-col pg-confirm__content-identity-col-right" },
                    React.createElement("div", { className: "pg-confirm__content-identity-col-row" },
                        React.createElement("fieldset", { className: residentialAddressGroupClass },
                            residentialAddress && React.createElement("legend", null, this.translate('page.body.kyc.identity.residentialAddress')),
                            React.createElement("input", { className: "pg-confirm__content-identity-col-row-content-number", type: "string", placeholder: this.translate('page.body.kyc.identity.residentialAddress'), value: residentialAddress, onChange: this.handleChange('residentialAddress'), onFocus: this.handleFieldFocus('residentialAddress'), onBlur: this.handleFieldFocus('residentialAddress') }))),
                    React.createElement("div", { className: "pg-confirm__content-identity-col-row" },
                        React.createElement("div", { className: "pg-confirm__content-identity-col-row-content" },
                            React.createElement("div", { className: "pg-confirm__content-identity-col-row-content-label" }, countryOfBirth && this.translate('page.body.kyc.identity.CoR')),
                            React.createElement(Dropdown, { className: "pg-confirm__content-documents-col-row-content-number", list: dataCountries, onSelect: onSelectCountry, placeholder: this.translate('page.body.kyc.identity.CoR') }))),
                    React.createElement("div", { className: "pg-confirm__content-identity-col-row" },
                        React.createElement("fieldset", { className: cityGroupClass },
                            city && React.createElement("legend", null, this.translate('page.body.kyc.identity.city')),
                            React.createElement("input", { className: "pg-confirm__content-identity-col-row-content-number", type: "string", placeholder: this.translate('page.body.kyc.identity.city'), value: city, onChange: this.handleChange('city'), onFocus: this.handleFieldFocus('city'), onBlur: this.handleFieldFocus('city') }))),
                    React.createElement("div", { className: "pg-confirm__content-identity-col-row" },
                        React.createElement("fieldset", { className: postcodeGroupClass },
                            postcode && React.createElement("legend", null, this.translate('page.body.kyc.identity.postcode')),
                            React.createElement("input", { className: "pg-confirm__content-identity-col-row-content-number", type: "string", placeholder: this.translate('page.body.kyc.identity.postcode'), value: postcode, onChange: this.handleChange('postcode'), onFocus: this.handleFieldFocus('postcode'), onBlur: this.handleFieldFocus('postcode'), onKeyPress: this.handleConfirmEnterPress }))))),
            success && React.createElement("p", { className: "pg-confirm__success" }, success),
            React.createElement("div", { className: "pg-confirm__content-deep" },
                React.createElement(Button, { className: "pg-confirm__content-phone-deep-button", label: this.translate('page.body.kyc.next'), onClick: this.sendData, disabled: this.handleCheckButtonDisabled() }))));
    }
}
const mapStateToProps = (state) => ({
    success: selectSendIdentitySuccess(state),
    lang: selectCurrentLanguage(state),
});
const mapDispatchProps = dispatch => ({
    sendIdentity: payload => dispatch(sendIdentity(payload)),
    labelFetch: () => dispatch(labelFetch()),
});

export const Identity = injectIntl(connect(mapStateToProps, mapDispatchProps)(IdentityComponent));