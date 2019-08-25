/* tslint:disable:jsx-no-lambda*/
import cr from 'classnames';
import * as React from 'react';

import {Button, Input, Loader} from '../../atoms';
import {
    EMAIL_REGEX,
    ERROR_EMPTY_PASSWORD,
    ERROR_INVALID_EMAIL,
} from '../../constants';

interface SignInFormValues {
    email: string;
    password: string;
}

interface SignInFormProps {
    /**
     * Submit error message
     */
    errorMessage?: string;
    /**
     * Enables loader when it is true
     */
    isLoading?: boolean;
    /**
     * Form title (e.g. 'Log in')
     * @default 'Sign-in'
     */
    title?: string;
    /**
     * Function which will be called on forgot password
     */
    onForgotPassword: (email?: string) => void;
    /**
     * Function which will be called on sign up
     */
    onSignUp: () => void;
    /**
     * Function which will be called on sign in
     */
    onSignIn: (data: SignInFormValues) => void;
    /**
     *  By default class name 'cr-sign-in-form'
     *  This property gives an additional class name
     */
    className?: string;
    /**
     * Customer's logo
     */
    image?: string;
}

export interface SignInFormState {
    email: string;
    emailError: string;
    password: string;
    passwordError: string;
}

class SignInForm extends React.Component<SignInFormProps, SignInFormState> {
    constructor(props: SignInFormProps) {
        super(props);
        this.state = {
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
        };
    }

    public render() {
        const {
            email,
            emailError,
            password,
            passwordError,
        } = this.state;
        const {
            errorMessage,
            isLoading,
            onSignUp,
            onForgotPassword,
            image,
        } = this.props;
        const buttonWrapperClass = cr('cr-sign-in-form__button-wrapper', {
            'cr-sign-in-form__button-wrapper--empty': !errorMessage,
        });
        return (
            <form>
                <div className="cr-sign-in-form">
                    {image ? (
                        <h1 className="cr-sign-in-form__title">
                            <img className="cr-sign-in-form__image" src={image} alt="logo"/>
                            Sign-in
                        </h1>
                    ) : (
                        <h1 className="cr-sign-in-form__title" style={{ marginTop: 119 }}>
                            Sign-in
                        </h1>
                        )}

                    <div className="cr-sign-in-form__group">
                        <label className="cr-sign-in-form__label">Email</label>
                        <Input
                            type={'email'}
                            value={email}
                            className={'cr-sign-in-form__input'}
                            onChangeValue={value => this.handleInput(value, 'email')}
                        />
                        {emailError && <div className={'cr-sign-in-form__error'}>{emailError}</div>}
                    </div>
                    <div className="cr-sign-in-form__group">
                        <label className="cr-sign-in-form__label">Password</label>
                        <Input
                            type={'password'}
                            value={password}
                            className={'cr-sign-in-form__input'}
                            onChangeValue={value => this.handleInput(value, 'password')}
                        />
                        <div
                            className={'cr-sign-in-form__forgot'}
                            onClick={() => onForgotPassword(email)}
                        >
                            Forgot?
                        </div>
                        {passwordError && <div className={'cr-sign-in-form__error'}>{passwordError}</div>}
                    </div>
                    <div className={buttonWrapperClass}>
                        <div className="cr-sign-in-form__error-message">{errorMessage || null}</div>
                        <div className="cr-sign-in-form__loader">{isLoading ? <Loader/> : null}</div>
                        <Button
                            label={isLoading ? 'Loading...' : 'Sign in'}
                            type="submit"
                            className={'cr-sign-in-form__button'}
                            disabled={isLoading}
                            onClick={this.handleClick}
                        />
                    </div>
                    <div className={'cr-sign-in-form__footer'}>
                        <p className={'cr-sign-in-form__footer-create'}>Create an account?</p>
                        <a
                            className={'cr-sign-in-form__footer-signup'}
                            onClick={onSignUp}
                        >
                            Sign up
                        </a>
                    </div>
                </div>
            </form>
        );
    }

    private handleSubmitForm() {
        const {
            email,
            password,
        } = this.state;

        this.setState({
            emailError: '',
            passwordError: '',
        }, () => {
            this.props.onSignIn({email, password});
        });
    }

    private isValidForm() {
        const {email, password} = this.state;
        const isEmailValid = email.match(EMAIL_REGEX);

        return email && isEmailValid && password;
    }

    private validateForm() {
        const {email,password} = this.state;
        const isEmailValid = email.match(EMAIL_REGEX);

        if (!isEmailValid) {
            this.setState({
                emailError: ERROR_INVALID_EMAIL,
                passwordError: '',
            });
            return;
        }
        if (!password) {
            this.setState({
                emailError: '',
                passwordError: ERROR_EMPTY_PASSWORD,
            });
            return;
        }
    }

    private handleInput = (value: string, type: string) => {
        switch (type) {
            case 'email':
                this.setState({
                    email: value,
                });
                break;
            case 'password':
                this.setState({
                    password: value,
                });
                break;
            default:
                break;
        }
    };

    private handleClick = (label?: string, e?: React.FormEvent<HTMLInputElement>) => {
        if (e) {
            e.preventDefault();
        }
        if (!this.isValidForm()) {
            this.validateForm();
        } else {
            this.handleSubmitForm();
        }
    };
}


export {
    SignInForm,
    SignInFormProps,
    SignInFormValues,
};
