import { PASSWORD_CHANGE_FORGOT_PASSWORD_FETCH, PASSWORD_CHANGE_FORGOT_PASSWORD_SUCCESS, PASSWORD_FORGOT_ERROR, PASSWORD_FORGOT_FETCH, PASSWORD_FORGOT_SUCCESS, } from './constants';
const initialState = {
    loading: false,
    forgotPasswordRequested: false,
    forgotPasswordChanged: false,
};
export const passwordReducer = (state = initialState, action) => {
    switch (action.type) {
        case PASSWORD_FORGOT_FETCH:
            return { ...state, loading: true };
        case PASSWORD_FORGOT_SUCCESS:
            return {
                ...state,
                forgotPasswordRequested: true,
                loading: false,
            };
        case PASSWORD_FORGOT_ERROR:
            return {
                ...state,
                forgotPasswordError: action.payload,
                loading: false,
            };
        case PASSWORD_CHANGE_FORGOT_PASSWORD_FETCH:
            return { ...state, loading: true };
        case PASSWORD_CHANGE_FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                forgotPasswordChanged: true,
                loading: false,
            };
        default:
            return state;
    }
};