import * as React from 'react';
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
declare class SignInForm extends React.Component<SignInFormProps, SignInFormState> {
    constructor(props: SignInFormProps);
    render(): JSX.Element;
    private handleSubmitForm;
    private isValidForm;
    private validateForm;
    private handleInput;
    private handleClick;
}
export { SignInForm, SignInFormProps, SignInFormValues, };
