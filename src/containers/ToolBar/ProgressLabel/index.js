import classnames from 'classnames';
import * as React from 'react';
export class ProgressLabel extends React.Component {
    render() {
        const { progress, isPositive, additional, bidUnit, } = this.props;
        const className = classnames({
            'pg-trading-header-progress-label-progress-positive': isPositive,
            'pg-trading-header-progress-label-progress-negative': !isPositive,
        });
        return (React.createElement("div", { className: "pg-trading-header-progress-label" },
            React.createElement("div", { className: className },
                progress,
                " ",
                bidUnit),
            React.createElement("div", { className: "pg-trading-header-progress-label-additional" }, additional)));
    }
}




