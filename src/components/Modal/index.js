import classnames from 'classnames';
import * as React from 'react';
const Modal = props => {
    const { className } = props;
    const cx = classnames('cr-modal', className);
    if (!props.show) {
        return null;
    }
    return (React.createElement("div", { className: cx },
        React.createElement("div", { className: "cr-modal__container" },
            React.createElement("div", { className: "cr-modal__container-header" }, props.header),
            React.createElement("div", { className: "cr-modal__container-content" }, props.content),
            React.createElement("div", { className: "cr-modal__container-footer" }, props.footer))));
};
export { Modal, };