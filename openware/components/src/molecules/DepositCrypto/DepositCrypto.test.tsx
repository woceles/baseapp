import { mount, shallow } from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { stub } from 'sinon';
import * as uuid from 'uuid';
import { CopyableTextField } from '../../atoms';
import { QRCode } from '../QRCode/QRCode';
import { DepositCrypto, DepositInfo } from './DepositCrypto';

describe('DepositCrypto', () => {
    describe('#render', () => {
        it('renders correctly', () => {
            const uuidMock = stub(uuid, 'v4').returns('0xdeadbeef');
            const tree = renderer
                .create(
                    <DepositCrypto
                        text="This is test"
                        data={'adknfjkwen'}
                        error={'error'}
                    />,
                )
                .toJSON();
            expect(tree).toMatchSnapshot();
            uuidMock.reset();
        });

        it('should contain copyable text field', () => {
            const text = 'Text';
            const address = 'address';
            const error = 'error';
            const wrapper = shallow(<DepositCrypto text={text} data={address} error={error} />);
            expect(wrapper
                .find(
                    <CopyableTextField
                        value={address}
                        className={'cr-deposit-crypto__copyable-area'}
                        fieldId={'copy_id-test'}
                    />,
                ))
                .toBeTruthy();
        });

        it('should have dimensions property', () => {
            const dimen = 'lg';
            const wrapper = shallow(
                <DepositCrypto
                    text={'text'}
                    data={'data'}
                    dimensions={dimen}
                    error={'error'}
                />,
            );
            const dimensions = wrapper.find(QRCode).prop('dimensions');
            expect(dimensions).toBe(dimen);
        });

        it('should have address property', () => {
            const walletAddress = 'wallet address';
            const wrapper = mount(
                <DepositCrypto
                    text={'vaerv'}
                    data={walletAddress}
                    error={'error'}
                />,
            );
            const { data } = wrapper.find(QRCode).first().props();
            expect(data).toBe(walletAddress);
        });

        it('should have text property', () => {
            const walletAddress = 'wallet address';
            const title = 'My title';
            const wrapper = mount(
                <DepositCrypto
                    text={title}
                    data={walletAddress}
                    error={'error'}
                />,
            );
            const { data } = wrapper.find(DepositInfo).first().props();
            expect(data).toBe(title);
        });
    });
});
