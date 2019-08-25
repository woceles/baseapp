// TODO: add checkbox(not merged)
/* tslint:disable:jsx-no-lambda*/
import cr from 'classnames';
import * as React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import {
    Button,
    Checkbox,
    Input,
    Loader,
} from '../../atoms/';
import {
    EMAIL_REGEX,
    ERROR_INVALID_EMAIL,
    ERROR_INVALID_PASSWORD,
    ERROR_PASSWORD_CONFIRMATION,
    PASSWORD_REGEX,
} from '../../constants';

interface SignUpFormValues {
    confirmPassword: string;
    email: string;
    password: string;
    recaptcha_response: string;
}

interface SignUpFormProps {
    /**
     * sitekey for recaptcha
     */
    siteKey?: string;
    /**
     * Submit error message
     */
    errorMessage?: string;
    /**
     * Enables loader
     */
    isLoading?: boolean;
    /**
     * Form title (e.g. 'Register')
     * @default 'Sign-up'
     */
    title?: string;
    /**
     * Function which will be called on sign up
     */
    onSignUp: (data: SignUpFormValues) => void;
    /**
     * Function which will be called on sign in
     */
    onSignIn?: () => void;
    /**
     *  By default class name 'cr-sign-up-form'
     *  This property gives an additional class name
     */
    className?: string;
    /**
     * Customer's logo
     */
    image?: string;
}

export interface SignUpFormState {
    confirmPassword: string;
    confirmationError: string;
    email: string;
    emailError: string;
    password: string;
    passwordError: string;
    hasConfirmed: boolean;
    recaptchaConfirmed: boolean;
    recaptcha_response: string;
}

class SignUpForm extends React.Component<SignUpFormProps, SignUpFormState> {
    constructor(props: SignUpFormProps) {
        super(props);
        this.state = {
            confirmationError: '',
            confirmPassword: '',
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            hasConfirmed: false,
            recaptchaConfirmed: false,
            recaptcha_response: '',
        };
    }

    public onChange = (value: string) => {
      this.setState({
        recaptchaConfirmed: true,
        recaptcha_response: value,
      });
    };

    public render() {
        const {
            email,
            emailError,
            password,
            passwordError,
            confirmPassword,
            confirmationError,
            hasConfirmed,
            recaptchaConfirmed,
        } = this.state;
        const {
            onSignIn,
            errorMessage,
            image,
            isLoading,
            siteKey,
        } = this.props;
        const buttonWrapperClass = cr('cr-sign-in-form__button-wrapper', {
            'cr-sign-in-form__button-wrapper--empty': !errorMessage,
        });
        return (
            <form>
                <div className="cr-sign-up-form">
                  {image ? (
                      <h1 className="cr-sign-up-form__title">
                          <img className="cr-sign-up-form__image" src={image} alt="logo"/>
                          Sign-up
                      </h1>
                  ) : (
                      <h1 className="cr-sign-up-form__title" style={{ marginTop: 119 }}>
                          Sign-up
                      </h1>
                      )}
                    <div className="cr-sign-up-form__group">
                        <label className="cr-sign-up-form__label">Email</label>
                        <Input
                            type={'email'}
                            value={email}
                            className={'cr-sign-up-form__input'}
                            onChangeValue={value => this.handleInput(value, 'email')}
                        />
                        {emailError && <div className={'cr-sign-up-form__error'}>{emailError}</div>}
                    </div>
                    <div className="cr-sign-up-form__group">
                        <label className="cr-sign-up-form__label">Password</label>
                        <Input
                            type={'password'}
                            value={password}
                            className={'cr-sign-up-form__input'}
                            onChangeValue={value => this.handleInput(value, 'password')}
                        />
                        {passwordError &&
                        <div className={'cr-sign-up-form__error'}>{passwordError}</div>}
                    </div>
                    <div className="cr-sign-up-form__group">
                        <label className="cr-sign-up-form__label">Confirm Password</label>
                        <Input
                            type={'password'}
                            value={confirmPassword}
                            className={'cr-sign-up-form__input'}
                            onChangeValue={value => this.handleInput(value, 'confirmation')}
                        />
                        {confirmationError &&
                        <div className={'cr-sign-up-form__error'}>{confirmationError}</div>}
                    </div>
                    <div>
                        <Checkbox
                            checked={hasConfirmed}
                            className={'cr-sign-up-form__checkbox'}
                            onChange={() => this.handleCheckboxClick()}
                            label={'By signing up, I confirm that I have read and I agree to the TERMS AND CONDITIONS & PRIVACY POLICY.'}
                        />
                    </div>
                    {hasConfirmed ?
                    <div className="cr-sign-up-form__recaptcha">
                      <ReCAPTCHA
                        sitekey={siteKey}
                        onChange={this.onChange}
                      />
                    </div> : null}
                    <div className={buttonWrapperClass}>
                        <div className="cr-sign-in-form__error-message">{errorMessage || null}</div>
                        <div className="cr-sign-in-form__loader">{isLoading ? <Loader/> : null}</div>
                        <Button
                            type="submit"
                            className={'cr-sign-up-form__button'}
                            label={isLoading ? 'Loading...' : 'Sign up'}
                            disabled={!hasConfirmed || isLoading || !recaptchaConfirmed}
                            onClick={this.handleClick}
                        />
                    </div>
                    <div className={'cr-sign-up-form__footer'}>
                        <p className={'cr-sign-up-form__footer-create'}>Already have an account?</p>
                        <span
                            className={'cr-sign-up-form__footer-signin'}
                            onClick={onSignIn}
                        >
                        Sign in
                        </span>
                    </div>
                </div>
            </form>
        );
    }

    private handleCheckboxClick(): void {
        this.setState(prev => ({
            hasConfirmed: !prev.hasConfirmed,
        }));
    }

    private handleSubmitForm() {
        const {
            confirmPassword,
            email,
            password,
            recaptcha_response,
        } = this.state;

        this.setState({
            hasConfirmed: false,
            confirmationError: '',
            emailError: '',
            passwordError: '',
        }, () => {
            this.props.onSignUp({confirmPassword, email, password, recaptcha_response});
        });
    }

    private isValidForm() {
        const {email, password, confirmPassword} = this.state;
        const isEmailValid = email.match(EMAIL_REGEX);
        const isPasswordValid = password.match(PASSWORD_REGEX);
        const isConfirmPasswordValid = password === confirmPassword;

        return (email && isEmailValid) &&
            (password && isPasswordValid) &&
            (confirmPassword && isConfirmPasswordValid);
    }

    private validateForm() {
        const {email, password, confirmPassword} = this.state;
        const isEmailValid = email.match(EMAIL_REGEX);
        const isPasswordValid = password.match(PASSWORD_REGEX);
        const isConfirmPasswordValid = password === confirmPassword;

        if (!isEmailValid && !isPasswordValid) {
            this.setState({
                confirmationError: '',
                emailError: ERROR_INVALID_EMAIL,
                passwordError: ERROR_INVALID_PASSWORD,
                hasConfirmed: false,
            });
            return;
        }

        if (!isEmailValid) {
            this.setState({
                confirmationError: '',
                emailError: ERROR_INVALID_EMAIL,
                passwordError: '',
                hasConfirmed: false,
            });
            return;
        }

        if (!isPasswordValid) {
            this.setState({
                confirmationError: '',
                emailError: '',
                passwordError: ERROR_INVALID_PASSWORD,
                hasConfirmed: false,
            });
            return;
        }

        if (!isConfirmPasswordValid) {
            this.setState({
                confirmationError: ERROR_PASSWORD_CONFIRMATION,
                emailError: '',
                passwordError: '',
                hasConfirmed: false,
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
            case 'confirmation': {
                this.setState({
                    confirmPassword: value,
                });
                break;
            }
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
    SignUpForm,
    SignUpFormProps,
    SignUpFormValues,
};
