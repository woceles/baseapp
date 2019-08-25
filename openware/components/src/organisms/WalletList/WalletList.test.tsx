import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { SinonSpy, spy } from 'sinon';
import { WalletItemProps } from '../../molecules';
import { WalletList, WalletListProps } from './WalletList';

const onWalletSelectionChange = spy();
const walletItems: WalletItemProps[] = [
    {
        active: false,
        address: 'something-0',
        locked: 1,
        fee: 0.123,
        currency: 'BTC',
        balance: 456,
        type: 'fiat',
    }, {
        active: false,
        address: 'something-1',
        fee: 0.123,
        locked: 100,
        currency: 'USD',
        balance: 456,
        type: 'coin',
    }, {
        active: false,
        address: 'something-2',
        fee: 0.3,
        locked: 0.4,
        currency: 'BTC',
        balance: 2,
        type: 'fiat',
    },
];

const defaultProps: WalletListProps = {
    onWalletSelectionChange: onWalletSelectionChange,
    walletItems: walletItems,
};

const setup = (props: Partial<WalletListProps> = {}) =>
    shallow(<WalletList {...{ ...defaultProps, ...props }} />);

describe('WalletList', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = setup();
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should have correct className', () => {
        expect(wrapper.hasClass('cr-wallet-list')).toBeTruthy();
    });

    it('should handle onWalletSelectionChange callback when an element is pressed', () => {
        const first = wrapper.find('[onClick]').first();
        first.simulate('click');
        expect((onWalletSelectionChange as SinonSpy).calledOnceWith(walletItems[0])).toBeTruthy();
    });

    it('should do nothing if onWalletSelectionChange is undefined', () => {
        wrapper = setup({ onWalletSelectionChange: undefined });
        wrapper.find('[onClick]').last().simulate('click');
        expect(wrapper.state()).toEqual({ activeIndex: 2 });
    });
});
