import { Button, Dropdown, Loader, } from '@openware/components';
import cr from 'classnames';
import * as React from 'react';
import { injectIntl, } from 'react-intl';
import MaskInput from 'react-maskinput';
import { connect, } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isDateInFuture } from '../../../helpers/checkDate';
import { selectSendDocumentsLoading, selectSendDocumentsSuccess, sendDocuments, } from '../../../modules/user/kyc/documents';

class DocumentsComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.translate = (e) => {
            return this.props.intl.formatMessage({ id: e });
        };
        this.data = [
            this.translate('page.body.kyc.documents.select.passport'),
            this.translate('page.body.kyc.documents.select.identityCard'),
            this.translate('page.body.kyc.documents.select.driverLicense'),
            this.translate('page.body.kyc.documents.select.utilityBill'),
        ];
        this.state = {
            documentsType: '',
            expiration: '',
            expirationFocused: false,
            idNumber: '',
            idNumberFocused: false,
            scans: [],
        };
        this.handleChangeDocumentsType = (value) => {
            this.setState({
                documentsType: value,
            });
        };
        this.handleFileDelete = (key) => () => {
            const fileList = Array.from(this.state.scans);
            fileList.splice(key, 1);
            this.setState({
                scans: fileList,
            });
        };
        this.renderScan = (scan, index) => {
            return (React.createElement("div", { className: "pg-confirm__content-documents-filename", key: index, onClick: this.handleFileDelete(index) },
                scan.name.slice(0, 27),
                "...\u00A0", 
                // eslint-disable-next-line no-restricted-globals
                React.createElement("img", { src: close })));
        };
        this.handleChangeIdNumber = (e) => {
            this.setState({
                idNumber: e.target.value,
            });
        };
        this.handleFieldFocus = (field) => {
            return () => {
                switch (field) {
                    case 'expiration':
                        this.setState({
                            expirationFocused: !this.state.expirationFocused,
                        });
                        break;
                    case 'idNumber':
                        this.setState({
                            idNumberFocused: !this.state.idNumberFocused,
                        });
                        break;
                    default:
                        break;
                }
            };
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
        this.handleChangeExpiration = (e) => {
            this.setState({
                expiration: this.formatDate(e.target.value),
            });
        };
        this.handleUploadScan = uploadEvent => {
            const allFiles = uploadEvent.target.files;
            const oldFileList = Array.from(this.state.scans);
            const additionalFileList = Array.from(allFiles).length > 5 ? Array.from(allFiles).slice(0, 5) : Array.from(allFiles);
            if (oldFileList.length !== 5) {
                this.setState({
                    scans: additionalFileList.concat(oldFileList),
                });
            }
        };
        this.handleFileDrop = event => {
            event.preventDefault();
            event.stopPropagation();
            const uploadObj = {
                target: event.nativeEvent.dataTransfer,
            };
            this.handleUploadScan(uploadObj);
        };
        this.handleDragOver = event => {
            event.preventDefault();
            event.stopPropagation();
        };
        this.handleCheckButtonDisabled = () => {
            const { expiration, idNumber, scans, } = this.state;
            return !scans.length || !idNumber || !expiration;
        };
        this.sendDocuments = () => {
            const { scans, idNumber, expiration, documentsType, } = this.state;
            const typeOfDocuments = this.getDocumentsType(documentsType);
            const docExpire = isDateInFuture(expiration) ? expiration : '';
            if (!scans.length) {
                return;
            }
            const request = new FormData();
            for (const scan of scans) {
                request.append('upload[]', scan);
            }
            request.append('doc_expire', docExpire);
            request.append('doc_type', typeOfDocuments);
            request.append('doc_number', idNumber);
            this.props.sendDocuments(request);
        };
        this.getDocumentsType = (value) => {
            switch (value) {
                case this.data[0]: return 'Passport';
                case this.data[1]: return 'Identity card';
                case this.data[2]: return 'Driver license';
                case this.data[3]: return 'Utility Bill';
                default: return value;
            }
        };
    }
    componentWillReceiveProps(next) {
        if (next.success) {
            this.props.history.push('/profile');
        }
    }
    render() {
        const { documentsType, expiration, expirationFocused, idNumber, idNumberFocused, scans, } = this.state;
        const { loading } = this.props;
        const expirationFocusedClass = cr('pg-confirm__content-documents-col-row-content', {
            'pg-confirm__content-documents-col-row-content--focused': expirationFocused,
        });
        const idNumberFocusedClass = cr('pg-confirm__content-documents-col-row-content', {
            'pg-confirm__content-documents-col-row-content--focused': idNumberFocused,
        });
        const onSelect = value => this.handleChangeDocumentsType(this.data[value]);
        const numberType = `${documentsType || this.translate('page.body.kyc.documentsType')}${this.translate('page.body.kyc.documents.number')}`;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "pg-confirm__content-documents" },
                React.createElement("div", { className: "pg-confirm__content-documents-col-row" },
                    React.createElement("div", { className: "pg-confirm__content-documents-col" },
                        React.createElement("div", { className: "pg-confirm__content-documents-col-row" },
                            React.createElement("div", { className: "pg-confirm__content-documents-col-row-content-3" },
                                React.createElement("div", { className: "pg-confirm__content-documents-col-row-content-label" }, documentsType && this.translate('page.body.kyc.documentsType')),
                                React.createElement(Dropdown, { className: "pg-confirm__content-documents-col-row-content-number", list: this.data, placeholder: this.translate('page.body.kyc.documentsType'), onSelect: onSelect, elemHeight: 40, listHeight: 160 })),
                            React.createElement("fieldset", { className: idNumberFocusedClass },
                                idNumber && React.createElement("legend", null, documentsType),
                                React.createElement("input", { className: "pg-confirm__content-documents-col-row-content-number", type: "string", placeholder: numberType, value: idNumber, onChange: this.handleChangeIdNumber, onFocus: this.handleFieldFocus('idNumber'), onBlur: this.handleFieldFocus('idNumber') })),
                            React.createElement("fieldset", { className: expirationFocusedClass },
                                expiration && React.createElement("legend", null, this.translate('page.body.kyc.documents.expiryDate')),
                                React.createElement(MaskInput, { maskString: "00/00/0000", mask: "00/00/0000", onChange: this.handleChangeExpiration, onFocus: this.handleFieldFocus('expiration'), onBlur: this.handleFieldFocus('expiration'), value: expiration, className: "group-input", placeholder: this.translate('page.body.kyc.documents.expiryDate') })))),
                    React.createElement("div", { className: "pg-confirm__loader" }, loading ? React.createElement(Loader, null) : null),
                    React.createElement("div", { className: "pg-confirm__content-documents-col pg-confirm__content-documents-drag" },
                        React.createElement("div", { className: "pg-confirm__content-documents-col-row" },
                            React.createElement("div", { className: "pg-confirm__content-documents-col-row-content-2" },
                                this.translate('page.body.kyc.documents.upload'),
                                React.createElement("div", { className: "pg-confirm__content-documents-col-row-content-2-documents" },
                                    React.createElement("form", { className: "box", draggable: true, onDrop: this.handleFileDrop, onDragOver: this.handleDragOver, method: "post", action: "", "data-enctype": "multipart/form-data" },
                                        React.createElement("input", { className: "pg-confirm__content-documents-col-row-content-2-documents-input", "data-multiple-caption": "files selected", draggable: true, multiple: true, name: "files[]", type: "file", id: "file", onChange: this.handleUploadScan }),
                                        React.createElement("div", { className: "pg-confirm__content-documents-col-row-content-2-documents-label" },
                                            React.createElement("label", { className: "pg-confirm__content-documents-col-row-content-2-documents-label-item", htmlFor: "file" },
                                                React.createElement("p", { className: "active" }, this.translate('page.body.kyc.documents.drag')),
                                                React.createElement("div", { className: "muted" }, this.translate('page.body.kyc.documents.maxFile')),
                                                React.createElement("div", { className: "muted" }, this.translate('page.body.kyc.documents.maxNum')))))),
                                Array.from(scans).map(this.renderScan)))))),
            React.createElement("div", { className: "pg-confirm__content-deep" },
                React.createElement(Button, { className: "pg-confirm__content-phone-deep-button", label: this.translate('page.body.kyc.submit'), onClick: this.sendDocuments, disabled: this.handleCheckButtonDisabled() }))));
    }
}
const mapStateToProps = (state) => ({
    success: selectSendDocumentsSuccess(state),
    loading: selectSendDocumentsLoading(state),
});
const mapDispatchProps = dispatch => ({
    sendDocuments: payload => dispatch(sendDocuments(payload)),
});

export const Documents = injectIntl(withRouter(connect(mapStateToProps, mapDispatchProps)(DocumentsComponent)));