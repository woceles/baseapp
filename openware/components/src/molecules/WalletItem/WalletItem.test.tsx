import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { WalletItem } from './WalletItem';

describe('WalletItem', () => {
    describe('#render', () => {
        it('uses styles by default', () => {
            const wrapper = mount(
                <WalletItem
                    address={'aevrv'}
                    currency={'BTC'}
                    // tslint:disable-next-line:no-magic-numbers
                    balance={45}
                    // tslint:disable-next-line:no-magic-numbers
                    locked={3}
                    // tslint:disable-next-line:no-magic-numbers
                    fee={0.3}
                    type={'fiat'}
                    active={false}
                />,
            );
            const { className } = wrapper.find('div').first().props();
            expect(className).toContain('cr-wallet-item');
        });

        it('displays codes, balances and locked', () => {
            const wrapper = mount(
                <WalletItem
                    address={'aevrv'}
                    currency={'BTC'}
                    // tslint:disable-next-line:no-magic-numbers
                    balance={45}
                    // tslint:disable-next-line:no-magic-numbers
                    locked={3}
                    // tslint:disable-next-line:no-magic-numbers
                    fee={0.3}
                    type={'fiat'}
                    active={false}
                />,
            );
            const labelElement = wrapper.find('.cr-wallet-item__icon-code');
            expect(labelElement.text()).toContain('BTC');
        });

        it('should not display locked balance if wallet does not have one', () => {
            const wrapper = shallow(
                <WalletItem
                    address={'aevrv'}
                    currency={'BTC'}
                    // tslint:disable-next-line:no-magic-numbers
                    balance={45}
                    // tslint:disable-next-line:no-magic-numbers
                    fee={0.3}
                    type={'fiat'}
                    active={false}
                />,
            );
            const balanceElement = wrapper.find('.cr-wallet-item__balance');
            expect(balanceElement.props().className)
                .not.toContain('cr-wallet-item__balance-locked');
        });

        it('shows currency name', () => {
            const wrapper = shallow(
                <WalletItem
                    address={'aevrv'}
                    currency={'BTC'}
                    // tslint:disable-next-line:no-magic-numbers
                    balance={45}
                    // tslint:disable-next-line:no-magic-numbers
                    locked={3}
                    // tslint:disable-next-line:no-magic-numbers
                    fee={0.3}
                    type={'fiat'}
                    active={true}
                />,
            );
            const { className } = wrapper.find('div').first().props();
            expect(className).toContain('cr-wallet-item--active');
            const { children } = wrapper.props();
            // tslint:disable-next-line:no-magic-numbers
            expect(children[1].props.children[3].props.children.props.children[1]).toEqual(3);
        });

        it('should render when locked = 0', () => {
            const wrapper = shallow(
                <WalletItem
                    address={'aevrv'}
                    currency={'BTC'}
                    locked={0}
                    // tslint:disable-next-line:no-magic-numbers
                    fee={0.3}
                    type={'fiat'}
                    active={true}
                    // tslint:disable-next-line:no-magic-numbers
                    balance={45}
                />,
            );
            const { children } = wrapper.props();
            // tslint:disable-next-line:no-magic-numbers
            expect(children[1].props.children[2].charCodeAt(0)).toEqual(160);
        });
    });
});
