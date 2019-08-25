import classnames from 'classnames';
import * as React from 'react';

interface HeaderItemProps {
    /**
     * Additional class name for styling. By default element receives `cr-header-item` class
     * @default empty
     */
    className?: string;
    /**
     * The string to use as the label for the HeaderItem.
     */
    label: string;
    /**
     * Number to use as a summary
     */
    amount: number;
    /**
     * Optinal string that define currency if it needs
     * @default empty
     */
    currency?: string;
    /**
     * Optinal sign that define change if it needs
     * @default empty
     */
    sign?: string;
}

const HeaderItem: React.FunctionComponent<HeaderItemProps> = props => {
    const {
      label,
      amount,
      className,
      currency,
      sign,
    } = props;
    const cx = classnames('cr-header-item', className);

    const cxAmount = classnames({
        'cr-header-item__amount-plus': sign === '+' && currency === undefined,
        'cr-header-item__amount-minus': sign === '-' && currency === undefined,
        'cr-header-item__amount-default': sign === undefined && currency !== undefined,
    });

    return (
        <div className={cx}>
          {currency ? <div className={cxAmount}>{amount} {currency.toUpperCase()}</div> : <div className={cxAmount}>{sign}{amount}{sign ? '%' : ''}</div>}
          <div className="cr-header-item__label">{label}</div>
        </div>
    );
};

export {
    HeaderItem,
    HeaderItemProps,
};
