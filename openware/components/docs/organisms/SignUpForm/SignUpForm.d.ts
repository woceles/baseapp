import * as React from 'react';
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
declare class SignUpForm extends React.Component<SignUpFormProps, SignUpFormState> {
    constructor(props: SignUpFormProps);
    onChange: (value: string) => void;
    render(): JSX.Element;
    private handleCheckboxClick;
    private handleSubmitForm;
    private isValidForm;
    private validateForm;
    private handleInput;
    private handleClick;
}
export { SignUpForm, SignUpFormProps, SignUpFormValues, };
