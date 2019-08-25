import { EMAIL_VERIFICATION_DATA, EMAIL_VERIFICATION_ERROR, EMAIL_VERIFICATION_FETCH, } from './constants';
export const initialState = {
    loading: false,
    success: false,
};
export const sendEmailVerificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case EMAIL_VERIFICATION_DATA:
            return {
                ...state,
                loading: false,
                success: true,
            };
        case EMAIL_VERIFICATION_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error,
            };
        case EMAIL_VERIFICATION_FETCH:
            return {
                ...state,
                loading: true,
                success: false,
            };
        default:
            return state;
    }
};