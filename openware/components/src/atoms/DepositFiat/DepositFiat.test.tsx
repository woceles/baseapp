import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { KeyValuePair } from '../../types/index';
import { DepositFiat } from './DepositFiat';

describe('DepositFiat', () => {
    const title = 'You can deposit in any bank';
    const description = 'Please use the information below.';

    const testData: KeyValuePair[] = [
        {
            key: 'Bank Name',
            value: 'Diamant Bank',
        },
        {
            key: 'Account number',
            value: '1036272',
        },
        {
            key: 'Account name',
            value: 'p2pd2b',
        },
        {
            key: 'Phone Number',
            value: '+290 2929 12',
        },
        {
            key: 'Your Reference code',
            value: '123456',
        },
    ];

    describe('#render', () => {
        it('renders title and description', () => {
            const wrapper: ReactWrapper = mount(
                <DepositFiat
                    data={[]}
                    description={description}
                    title={title}
                />,
            );

            const renderedTitle: string = wrapper.find('.cr-deposit-fiat__title').text();
            const renderedDescription: string = wrapper.find('.cr-deposit-fiat__description').text();

            expect(renderedTitle).toBe(title);
            expect(renderedDescription).toBe(description);
        });

        it('renders list of details', () => {
            const wrapper: ReactWrapper = mount(
                <DepositFiat
                    data={testData}
                    description={description}
                    title={title}
                />,
            );

            const children: ReactWrapper =
                wrapper.find('.cr-deposit-fiat-detail');

            // tslint:disable-next-line:no-magic-numbers
            expect(children).toHaveLength(5);
        });
    });
});
